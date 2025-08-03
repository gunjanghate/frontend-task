"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { motion } from "framer-motion"
import { generatePDF } from "@/lib/pdf-generator"

interface FormData {
  name: string
  email: string
  phone: string
  position: string
  description: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.2 },
  },
}

export default function FormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    description: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const formFields = [
    {
      key: "name" as keyof FormData,
      label: "Name",
      type: "text",
      placeholder: "e.g. John Doe",
      icon: "/icons/user.svg",
      component: Input,
      componentProps: {},
      validation: true,
    },
    {
      key: "email" as keyof FormData,
      label: "Email",
      type: "email",
      placeholder: "e.g. Johndoe@gmail.com",
      icon: "/icons/mail.svg",
      component: Input,
      componentProps: {},
      validation: true,
    },
    {
      key: "phone" as keyof FormData,
      label: "Phone Number",
      type: "tel",
      placeholder: "e.g. (220) 222 -20002",
      icon: "/icons/phone-call.svg",
      component: Input,
      componentProps: {},
      validation: true,
    },
    {
      key: "position" as keyof FormData,
      label: "Position",
      type: "text",
      placeholder: "e.g. Junior Front end Developer",
      icon: "/icons/position.svg",
      component: Input,
      componentProps: {},
      validation: false,
    },
    {
      key: "description" as keyof FormData,
      label: "Description",
      type: "textarea",
      placeholder: "e.g. Work experiences",
      icon: "/icons/description.svg",
      component: Textarea,
      componentProps: { rows: 4 },
      validation: false,
    },
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleViewPDF = () => {
    if (validateForm()) {
      localStorage.setItem("pdfFormData", JSON.stringify(formData))
      router.push("/preview")
    }
  }

  const handleDownloadPDF = () => {
    if (validateForm()) {
      generatePDF(formData)
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-lg mx-auto">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add Your details</h1>
        </motion.div>

        <div className="space-y-4">
        {formFields.map((field) => {
          const Component = field.component
          const error = errors[field.key as keyof FormErrors]
          const isTextarea = field.type === "textarea"

          return (
          <motion.div key={field.key} variants={itemVariants} className="space-y-2">
            <motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <motion.div
              variants={iconVariants}
              whileHover="hover"
              className={`absolute left-3 z-10 ${
              isTextarea ? "top-10" : "top-10"
              }`}
            >
              <Image src={field.icon} alt={`${field.label} icon`} width={25} height={25} />
            </motion.div>
            <div>
              <Label htmlFor={field.key} className="text-base font-semibold text-gray-700 mb-1 block">
              {field.label}
              </Label>
              <Component
              id={field.key}
              type={!isTextarea ? field.type : undefined}
              placeholder={field.placeholder}
              value={formData[field.key]}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                handleInputChange(field.key, e.target.value)
              }
              className={`pl-12 text-base border-2 rounded-lg bg-gray-50 transition-all duration-300 focus:scale-[1.01] focus:bg-white ${
                isTextarea ? "min-h-24 resize-none" : "h-12"
              } ${
                error ? "border-red-500" : "border-gray-200 focus:border-green-500"
              } w-full`}
              {...field.componentProps}
              />
              {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {error}
              </motion.p>
              )}
            </div>
            </motion.div>
          </motion.div>
          )
        })}

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-4 pt-8">
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="w-full md:w-auto">
          <Button
            onClick={handleViewPDF}
            className="w-full md:w-64 h-12 text-base font-semibold bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="mr-2">
            <Image src="/icons/view.svg" alt="View icon" width={20} height={20} />
            </motion.div>
            View PDF
          </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="w-full md:w-auto">
          <Button
            onClick={handleDownloadPDF}
            className="w-full md:w-64 h-12 text-base font-semibold bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="mr-2">
            <Image src="/icons/download.svg" alt="Download icon" width={20} height={20} />
            </motion.div>
            Download PDF
          </Button>
          </motion.div>
        </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  )
}