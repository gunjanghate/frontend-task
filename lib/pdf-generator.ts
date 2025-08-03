interface FormData {
  name: string
  email: string
  phone: string
  position: string
  description: string
}

export const generatePDF = async (formData: FormData) => {
  try {
    const jsPDF = (await import("jspdf")).default

    const doc = new jsPDF()

    doc.setFont("helvetica")
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("Personal Details", 20, 30)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")

    let yPosition = 60
    const lineHeight = 20


    doc.text("Name:", 20, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(formData.name, 80, yPosition)
    yPosition += lineHeight

    doc.setFont("helvetica", "bold")
    doc.text("Email:", 20, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(formData.email, 80, yPosition)
    yPosition += lineHeight

    doc.setFont("helvetica", "bold")
    doc.text("Phone Number:", 20, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(formData.phone, 80, yPosition)
    yPosition += lineHeight

    doc.setFont("helvetica", "bold")
    doc.text("Position:", 20, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(formData.position, 80, yPosition)
    yPosition += lineHeight * 1.5

    doc.setFont("helvetica", "bold")
    doc.text("Description:", 20, yPosition)
    yPosition += 10

    doc.setFont("helvetica", "normal")

    const splitDescription = doc.splitTextToSize(formData.description, 150)
    doc.text(splitDescription, 20, yPosition)

    doc.save(`${formData.name.replace(/\s+/g, "_")}_details.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("Error generating PDF. Please try again.")
  }
}
