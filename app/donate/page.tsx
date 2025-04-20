"use client"

import PageLayout from "../page-layout"
import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Upload, Loader2, Check, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useLocationStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { categories } from "@/components/category-grid"
import { campuses } from "@/data/campuses"
import { analyzeImageWithGemini } from "@/lib/gemini-service";

export default function DonatePage() {
  // Form state
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [formEnabled, setFormEnabled] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [pickupInfo, setPickupInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { selectedCampus } = useLocationStore()
  const { toast } = useToast()

  // --- Image Handling and AI Analysis ---
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setUploadError(null)
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
      setImageFile(file)
      analyzeImage(file)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true)
    setFormEnabled(false)
    setIsAnalyzed(false)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = async () => {
        const base64Data = reader.result as string
        const suggestedCategories = await analyzeImageWithGemini(base64Data)
        const firstCategory = suggestedCategories[0]
        const categoryId = categories.find(c => c.name === firstCategory)?.id
          || categories[Math.floor(Math.random() * categories.length)].id
        setSuggestedCategory(categoryId)
        setCategory(categoryId)
        setIsAnalyzing(false)
        setIsAnalyzed(true)
        setFormEnabled(true)
        toast({
          title: "Image analyzed!",
          description: `We think this item belongs in the ${getCategoryDisplayName(categoryId)} category.`,
        })
      }
    } catch (error) {
      setIsAnalyzing(false)
      const categoryIds = categories.map((c) => c.id)
      const randomCategory = categoryIds[Math.floor(Math.random() * categoryIds.length)]
      setSuggestedCategory(randomCategory)
      setCategory(randomCategory)
      setIsAnalyzed(true)
      setFormEnabled(true)
      toast({
        title: "Analysis failed",
        description: "We couldn't analyze your image. Please select a category manually.",
        variant: "destructive",
      })
    }
  }

  const getCategoryDisplayName = (categoryId: string): string => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : categoryId
  }

  // --- Form Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile || !previewImage) {
      toast({
        title: "Missing image",
        description: "Please upload an image.",
        variant: "destructive",
      })
      return
    }
    if (!title || !description || !category || !pickupInfo) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields.",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    try {
      // 1. Upload image and get URL
      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: previewImage }), // base64
      })
      const uploadData = await uploadRes.json()
      if (!uploadData.url) throw new Error("Image upload failed")

      // 2. Submit listing to API
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          categoryId: category,
          locationId: selectedCampus,
          imageUrl: uploadData.url,
          pickupInfo,
        }),
      })
      if (res.ok) {
        toast({
          title: "Donation listed!",
          description: "Your item has been successfully listed.",
        })
        resetForm()
      } else {
        toast({
          title: "Error",
          description: "Failed to create listing. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit donation. Please try again.",
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  const handleCategorySelect = (val: string) => setCategory(val)

  const resetForm = () => {
    setPreviewImage(null)
    setImageFile(null)
    setSuggestedCategory(null)
    setCategory(null)
    setIsAnalyzed(false)
    setFormEnabled(false)
    setUploadError(null)
    setTitle("")
    setDescription("")
    setPickupInfo("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // --- Drag and Drop ---
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setUploadError(null)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size exceeds 5MB limit")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setImageFile(file)
        analyzeImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <PageLayout>
      <div className="container px-4 py-8 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-hackdavis-navy">Donate an Item</h1>
              <p className="text-hackdavis-navy">Share items you no longer need with your college community</p>
            </div>
            <Card className="border-hackdavis-blue/30">
              <CardContent className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-hackdavis-navy">
                      Item Photo
                    </Label>
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={`relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                          uploadError
                            ? "border-red-400 bg-red-50"
                            : "border-hackdavis-blue bg-hackdavis-blue/10 hover:bg-hackdavis-blue/20"
                        } dark:border-hackdavis-blue/50 dark:bg-gray-900 dark:hover:border-hackdavis-blue/70 dark:hover:bg-gray-800 ${
                          previewImage ? "p-2" : "p-6"
                        }`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <input
                          id="image"
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        {previewImage ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={previewImage || "/placeholder.svg"}
                              alt="Preview"
                              fill
                              className="rounded-lg object-contain"
                            />
                            <AnimatePresence>
                              {isAnalyzing && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"
                                >
                                  <div className="flex flex-col items-center gap-2 text-white">
                                    <Loader2 className="h-8 w-8 animate-spin" />
                                    <p>Analyzing image...</p>
                                  </div>
                                </motion.div>
                              )}
                              {isAnalyzed && !isAnalyzing && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full"
                                >
                                  <Check className="h-4 w-4" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-full">
                            {uploadError ? (
                              <div className="flex flex-col items-center text-red-500">
                                <AlertCircle className="mb-2 h-10 w-10" />
                                <p className="mb-2 text-sm font-medium">{uploadError}</p>
                                <p className="text-xs">Please try a different file</p>
                              </div>
                            ) : (
                              <>
                                <Camera className="mb-2 h-10 w-10 text-hackdavis-navy" />
                                <p className="mb-2 text-sm text-hackdavis-navy">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-hackdavis-navy">PNG, JPG or WEBP (MAX. 5MB)</p>
                              </>
                            )}
                          </label>
                        )}
                      </div>
                      {previewImage && (
                        <Button
                          variant="outline"
                          onClick={resetForm}
                          className="border-hackdavis-navy text-hackdavis-navy"
                          type="button"
                        >
                          Remove Image & Start Over
                        </Button>
                      )}
                      {!previewImage && (
                        <Label htmlFor="image" className="cursor-pointer text-center">
                          <Button type="button" className="bg-hackdavis-navy hover:bg-hackdavis-navy/80 text-white">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photo
                          </Button>
                        </Label>
                      )}
                    </div>
                  </div>

                  {/* Item Details - Only shown after image analysis */}
                  <AnimatePresence>
                    {formEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-hackdavis-navy">
                            Item Title
                          </Label>
                          <Input
                            id="title"
                            placeholder="e.g., Graphing Calculator, Winter Jacket"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-hackdavis-navy">
                            Category
                          </Label>
                          <Select value={category || undefined} onValueChange={handleCategorySelect}>
                            <SelectTrigger id="category" className={suggestedCategory ? "border-green-500" : ""}>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {suggestedCategory && (
                            <p className="text-xs text-green-600 mt-1">
                              AI suggested category: {getCategoryDisplayName(suggestedCategory)}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-hackdavis-navy">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your item, including condition and any other relevant details"
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-hackdavis-navy">
                            Campus Location
                          </Label>
                          <Select value={selectedCampus} disabled>
                            <SelectTrigger id="location">
                              <SelectValue placeholder="Select your campus" />
                            </SelectTrigger>
                            <SelectContent>
                              {campuses.map((campus) => (
                                <SelectItem key={campus.id} value={campus.id}>
                                  {campus.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1">
                            Location is automatically set based on your selected campus
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pickup-info" className="text-hackdavis-navy">
                            Pickup Information
                          </Label>
                          <Textarea
                            id="pickup-info"
                            placeholder="Provide details about where and when the item can be picked up"
                            rows={2}
                            value={pickupInfo}
                            onChange={e => setPickupInfo(e.target.value)}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-hackdavis-navy hover:bg-hackdavis-navy/80 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Submit Donation
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Instructions when no image is uploaded */}
                  {!previewImage && (
                    <div className="rounded-lg border border-hackdavis-blue/30 bg-hackdavis-blue/5 p-4">
                      <h3 className="mb-2 font-medium text-hackdavis-navy">How it works:</h3>
                      <ol className="list-decimal pl-5 space-y-2 text-sm text-hackdavis-navy/80">
                        <li>Upload a clear photo of the item you want to donate</li>
                        <li>Our AI will analyze the image and suggest a category</li>
                        <li>Review and complete the donation details</li>
                        <li>Submit your listing to share with your campus community</li>
                      </ol>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
