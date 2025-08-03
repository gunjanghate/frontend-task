"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: ["easeOut"] },
  },
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

export default function PreviewPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("pdfFormData")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    } else {
      router.push("/")
    }
  }, [router])

  const handleBack = () => {
    router.push("/")
  }

  const handleDownloadPDF = () => {
    if (formData) {
      generatePDF(formData)
    }
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-6 px-2 sm:py-8 sm:px-4"
    >
      <div className="max-w-4xl mx-auto">
      <motion.div variants={itemVariants}>
        <motion.div whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 p-2 hover:bg-gray-200 rounded-full transition-colors duration-300"
        >
          <Image src="/icons/chevron-left.svg" alt="Back arrow" width={24} height={24} />
        </Button>
        </motion.div>
      </motion.div>
      <motion.div>
        <Card className="shadow-lg bg-white overflow-hidden">
        <CardContent className="p-4 sm:p-8 md:p-12">
          <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-2 border-gray-300 p-4 sm:p-8 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-white rounded-lg"
          >
          <div className="space-y-6 sm:space-y-8">
            <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
            >
            <div className="w-full sm:w-32 font-bold text-base sm:text-lg text-gray-900">Name:</div>
            <div className="text-base sm:text-lg text-gray-600">{formData.name}</div>
            </motion.div>

            <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
            >
            <div className="w-full sm:w-32 font-bold text-base sm:text-lg text-gray-900">Email:</div>
            <div className="text-base sm:text-lg text-gray-600">{formData.email}</div>
            </motion.div>

            <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
            >
            <div className="w-full sm:w-32 font-bold text-base sm:text-lg text-gray-900">Phone Number:</div>
            <div className="text-base sm:text-lg text-gray-600">{formData.phone}</div>
            </motion.div>

            <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
            >
            <div className="w-full sm:w-32 font-bold text-base sm:text-lg text-gray-900">Position:</div>
            <div className="text-base sm:text-lg text-gray-600">{formData.position}</div>
            </motion.div>

            <motion.div
            variants={itemVariants}
            className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
            >
            <div className="font-bold text-base sm:text-lg text-gray-900 mb-2">Description:</div>
            <div className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-full sm:max-w-2xl">{formData.description}</div>
            </motion.div>
          </div>
          </motion.div>
        </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 sm:mt-8 flex justify-center">
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          onClick={handleDownloadPDF}
          className="h-12 sm:h-14 w-full sm:w-96 px-6 sm:px-12 text-base sm:text-lg font-semibold bg-green-600 hover:bg-green-700 rounded-xl transition-colors duration-300"
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
  )
}
