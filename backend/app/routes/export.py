import io
import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

router = APIRouter(prefix="/api/v1", tags=["Export"])


def _build_pdf(campaign: dict) -> bytes:
    """Generate a minimal multi-page PDF using ReportLab."""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.colors import HexColor
        from reportlab.lib.units import mm
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
        from reportlab.lib.enums import TA_CENTER, TA_LEFT

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=20*mm, bottomMargin=20*mm,
                                leftMargin=20*mm, rightMargin=20*mm)
        styles = getSampleStyleSheet()
        story = []

        PURPLE = HexColor("#8F7BFF")
        DARK = HexColor("#111111")

        title_style = ParagraphStyle("title", parent=styles["Title"], textColor=PURPLE,
                                     fontSize=22, spaceAfter=6)
        heading_style = ParagraphStyle("h2", parent=styles["Heading2"], textColor=DARK,
                                      fontSize=14, spaceAfter=4)
        body_style = ParagraphStyle("body", parent=styles["Normal"], fontSize=10, spaceAfter=8)

        story.append(Paragraph("CampaignMind AI — Enterprise Campaign Blueprint", title_style))
        story.append(Paragraph(campaign.get("name", ""), heading_style))
        story.append(Paragraph(f'<i>"{campaign.get("tagline", "")}"</i>', body_style))
        story.append(Spacer(1, 6*mm))

        story.append(Paragraph("Executive Summary", heading_style))
        story.append(Paragraph(str(campaign.get("executiveSummary", "")), body_style))
        story.append(Spacer(1, 4*mm))

        # KPIs
        kpi_data = [
            ["Campaign Score", "Projected ROI", "Target Reach", "Budget", "Duration"],
            [
                str(campaign.get("campaignScore", "—")),
                str(campaign.get("projectedRoi", "—")),
                str(campaign.get("targetReach", "—")),
                str(campaign.get("budget_input", "—")),
                str(campaign.get("duration", "—")),
            ]
        ]
        t = Table(kpi_data, colWidths=[34*mm]*5)
        t.setStyle(TableStyle([
            ("BACKGROUND", (0,0), (-1,0), PURPLE),
            ("TEXTCOLOR", (0,0), (-1,0), HexColor("#FFFFFF")),
            ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
            ("FONTSIZE", (0,0), (-1,-1), 9),
            ("ALIGN", (0,0), (-1,-1), "CENTER"),
            ("GRID", (0,0), (-1,-1), 0.5, HexColor("#CCCCCC")),
        ]))
        story.append(t)
        story.append(Spacer(1, 6*mm))

        # Social Posts
        social_posts = campaign.get("socialPosts", [])
        if social_posts:
            story.append(Paragraph("Multi-Platform Social Creatives", heading_style))
            for post in social_posts:
                story.append(Paragraph(f"<b>{post.get('platform', '')}:</b> {post.get('copy', '')}", body_style))

        # Suggestions
        suggestions = campaign.get("suggestions", [])
        if suggestions:
            story.append(Spacer(1, 4*mm))
            story.append(Paragraph("AI Evaluator Recommendations", heading_style))
            for i, s in enumerate(suggestions, 1):
                story.append(Paragraph(f"{i}. {s}", body_style))

        doc.build(story)
        buffer.seek(0)
        return buffer.read()
    except ImportError:
        # Fallback: plain text PDF placeholder
        return f"CampaignMind AI - {campaign.get('name', 'Campaign')} Blueprint\n\n{json.dumps(campaign, indent=2)}".encode()


@router.post("/export-campaign")
async def export_campaign(payload: dict):
    """
    Export a campaign blueprint as PDF, DOCX, JSON, or CSV.
    Payload: { "format": "pdf"|"docx"|"json"|"csv", "campaign": {...} }
    """
    fmt = payload.get("format", "json").lower()
    campaign = payload.get("campaign", {})

    if not campaign:
        raise HTTPException(status_code=400, detail="Campaign data is required.")

    filename_base = campaign.get("name", "campaignmind_export").replace(" ", "_")

    if fmt == "json":
        content = json.dumps(campaign, indent=2).encode("utf-8")
        return StreamingResponse(
            io.BytesIO(content),
            media_type="application/json",
            headers={"Content-Disposition": f"attachment; filename={filename_base}.json"}
        )

    if fmt == "pdf":
        content = _build_pdf(campaign)
        return StreamingResponse(
            io.BytesIO(content),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename_base}.pdf"}
        )

    if fmt == "csv":
        import csv
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["Field", "Value"])
        flat = {
            "Campaign Name": campaign.get("name", ""),
            "Tagline": campaign.get("tagline", ""),
            "Campaign Score": campaign.get("campaignScore", ""),
            "Projected ROI": campaign.get("projectedRoi", ""),
            "Target Reach": campaign.get("targetReach", ""),
            "Budget": campaign.get("budget_input", ""),
            "Duration": campaign.get("duration", ""),
        }
        for k, v in flat.items():
            writer.writerow([k, v])
        content = output.getvalue().encode("utf-8")
        return StreamingResponse(
            io.BytesIO(content),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename_base}.csv"}
        )

    # DOCX fallback
    try:
        from docx import Document
        doc = Document()
        doc.add_heading("CampaignMind AI — Enterprise Blueprint", 0)
        doc.add_heading(campaign.get("name", ""), 1)
        doc.add_paragraph(f'Tagline: "{campaign.get("tagline", "")}"')
        doc.add_heading("Executive Summary", 2)
        doc.add_paragraph(str(campaign.get("executiveSummary", "")))
        for post in campaign.get("socialPosts", []):
            doc.add_heading(post.get("platform", ""), 3)
            doc.add_paragraph(post.get("copy", ""))
        buffer = io.BytesIO()
        doc.save(buffer)
        buffer.seek(0)
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": f"attachment; filename={filename_base}.docx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")
