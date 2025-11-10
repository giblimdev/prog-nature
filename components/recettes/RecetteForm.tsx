"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { X, Plus, Upload } from 'lucide-react'
import Image from 'next/image'

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit avoir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit avoir au moins 10 caractères'),
  coutPreparation: z.number().min(0, 'Le coût doit être positif'),
  tempsPreparation: z.number().min(1, 'Le temps doit être d\'au moins 1 minute'),
  prixVente: z.number().min(0, 'Le prix de vente doit être positif'),
  categorie: z.enum(['ENTREE', 'PLAT', 'DESSERT', 'BOISSON']),
  etapes: z.array(z.string()).min(1, 'Au moins une étape est requise'),
  tags: z.array(z.string()),
  carte: z.string().nullish(),
  order: z.number().nullish(),
  image: z.string().nullish(),
  estActif: z.boolean(),
})

type RecetteFormValues = z.infer<typeof formSchema>

interface RecetteFormProps {
  initialData?: Partial<RecetteFormValues>
  onSubmit: (data: RecetteFormValues) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export default function RecetteForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}: RecetteFormProps) {
  const [currentEtape, setCurrentEtape] = useState('')
  const [currentTag, setCurrentTag] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)

  const form = useForm<RecetteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      coutPreparation: 0,
      tempsPreparation: 1,
      prixVente: 0,
      categorie: 'PLAT',
      etapes: [],
      tags: [],
      carte: null,
      order: null,
      image: null,
      estActif: true,
      ...initialData,
    },
  })

  const { watch } = form
  const coutPreparation = watch('coutPreparation')
  const prixVente = watch('prixVente')
  const marge = prixVente - coutPreparation
  const margePourcentage = prixVente > 0 ? (marge / prixVente) * 100 : 0

  const handleAddEtape = () => {
    if (currentEtape.trim()) {
      const currentEtapes = form.getValues('etapes')
      form.setValue('etapes', [...currentEtapes, currentEtape.trim()])
      setCurrentEtape('')
    }
  }

  const handleRemoveEtape = (index: number) => {
    const currentEtapes = form.getValues('etapes')
    form.setValue('etapes', currentEtapes.filter((_, i) => i !== index))
  }

  const handleAddTag = () => {
    if (currentTag.trim()) {
      const currentTags = form.getValues('tags')
      if (!currentTags.includes(currentTag.trim())) {
        form.setValue('tags', [...currentTags, currentTag.trim()])
      }
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (index: number) => {
    const currentTags = form.getValues('tags')
    form.setValue('tags', currentTags.filter((_, i) => i !== index))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        form.setValue('image', base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      callback()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colonne gauche */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la recette *</FormLabel>
                  <FormControl>
                    <Input placeholder="Paella aux fruits de mer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="carte"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carte</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="CARTE_PRINTEMPS" 
                        {...field} 
                        value={field.value || ''} 
                        onChange={(e) => field.onChange(e.target.value || null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ordre</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1, 2, 3..."
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categorie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ENTREE">Entrée</SelectItem>
                      <SelectItem value="PLAT">Plat principal</SelectItem>
                      <SelectItem value="DESSERT">Dessert</SelectItem>
                      <SelectItem value="BOISSON">Boisson</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez votre recette..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload d'image */}
            <div>
              <FormLabel>Image de la recette</FormLabel>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <div className="relative w-32 h-32">
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2"
                      onClick={() => {
                        setImagePreview(null)
                        form.setValue('image', null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        Choisir une image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="coutPreparation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coût de préparation (€) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prixVente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix de vente (€) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {prixVente > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <div>Marge brute: <strong>{marge.toFixed(2)}€</strong></div>
                  <div>Taux de marge: <strong>{margePourcentage.toFixed(1)}%</strong></div>
                  {margePourcentage < 30 && (
                    <div className="text-orange-600 text-xs mt-1">
                      Marge faible - recommandé d&apos;augmenter le prix
                    </div>
                  )}
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="tempsPreparation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temps de préparation (minutes) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Statut Actif */}
            <FormField
              control={form.control}
              name="estActif"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Recette active</FormLabel>
                    <div className="text-sm text-gray-500">
                      Cette recette apparaîtra dans le menu
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Tags */}
            <div>
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Ajouter un tag (végétarien, épicé...)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
                />
                <Button type="button" onClick={handleAddTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.watch('tags').map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-3 w-3 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveTag(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Étapes de préparation */}
        <div>
          <FormLabel>Étapes de préparation *</FormLabel>
          <div className="space-y-2 mt-2">
            <div className="flex gap-2">
              <Textarea
                placeholder="Décrivez une étape de préparation..."
                value={currentEtape}
                onChange={(e) => setCurrentEtape(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddEtape)}
                className="min-h-[60px]"
              />
              <Button type="button" onClick={handleAddEtape}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {form.watch('etapes').map((etape, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <p className="flex-1">{etape}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEtape(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          {form.formState.errors.etapes && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.etapes.message}
            </p>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enregistrement...' : initialData ? 'Modifier' : 'Créer'} la recette
          </Button>
        </div>
      </form>
    </Form>
  )
}