'use client'

import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
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
  FormDescription,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Code, Layers, FileText, Bookmark } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit avoir au moins 2 caractères'),
  type: z.string().min(1, 'Le type est requis'),
  content: z.string().min(1, 'Le contenu est requis'),
  parentId: z.number().nullable(),
})

type DevFormValues = z.infer<typeof formSchema>

interface Dev {
  id: number
  name: string
  type: string
  content: string
  createdAt: Date
  updatedAt: Date
  parentId: number | null
}

interface DevFormProps {
  initialData?: Partial<DevFormValues> & { id?: number }
  devs?: Dev[]
  onSubmit: (data: DevFormValues) => void
  onCancel: () => void
  isSubmitting?: boolean
}

const DEV_TYPES = [
  { label: 'Component', icon: Code },
  { label: 'Page', icon: Layers },
  { label: 'API Route', icon: FileText },
  { label: 'Utility', icon: Bookmark },
  { label: 'Hook', icon: Code },
  { label: 'Service', icon: Layers },
  { label: 'Model', icon: FileText },
  { label: 'Type', icon: Bookmark },
  { label: 'Config', icon: Code },
  { label: 'Documentation', icon: Layers },
  { label: 'Test', icon: FileText },
  { label: 'Other', icon: Bookmark },
]

export default function DevForm({
  initialData,
  devs,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: DevFormProps) {
  const form = useForm<DevFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'Component',
      content: '',
      parentId: null,
      ...initialData,
    },
  })

  const availableParents = (devs ?? []).filter(
    (d) => !initialData?.id || d.id !== initialData.id
  )

  const getDevPath = (devId: number): string => {
    const dev = (devs ?? []).find((d) => d.id === devId)
    if (!dev) return ''

    const parts: string[] = []
    let current = dev
    while (current) {
      parts.unshift(current.name)
      if (current.parentId === null) break
      const parent = (devs ?? []).find((d) => d.id === current.parentId)
      if (!parent) break
      current = parent
    }
    return parts.join(' > ')
  }

  const watchedName = useWatch({ control: form.control, name: 'name' })
  const watchedParentId = useWatch({ control: form.control, name: 'parentId' })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Colonne gauche */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                    <Code className="w-5 h-5 text-blue-500" />
                    Nom *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Mon composant" {...field} />
                  </FormControl>
                  <FormDescription>Nom de l&apos;élément (composant, page, etc.)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                    <Layers className="w-5 h-5 text-green-500" />
                    Type *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEV_TYPES.map(({ label, icon: Icon }) => (
                        <SelectItem key={label} value={label} className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-600" /> {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Type de l&apos;élément de développement</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                    <FileText className="w-5 h-5 text-purple-500" />
                    Parent
                  </FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value === 'null' ? null : parseInt(value))
                    }
                    defaultValue={field.value?.toString() || 'null'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Racine (aucun parent)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="null">Racine (aucun parent)</SelectItem>
                      {availableParents.map((dev) => (
                        <SelectItem key={dev.id} value={dev.id.toString()}>
                          {getDevPath(dev.id)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Élément parent dans la hiérarchie</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Colonne droite */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                    <Bookmark className="w-5 h-5 text-orange-500" />
                    Contenu *
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description, code, notes..." className="min-h-[300px] font-mono text-sm" {...field} />
                  </FormControl>
                  <FormDescription>Contenu de l&apos;élément (code, documentation, notes)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Preview chemin */}
        {watchedName && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
            <div className="text-sm font-medium text-blue-900 mb-1">Chemin complet :</div>
            <div className="text-sm text-blue-700 font-mono select-all">
              {watchedParentId ? `${getDevPath(watchedParentId)} > ${watchedName}` : watchedName}
            </div>
          </div>
        )}

        {/* Boutons actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
            {isSubmitting ? 'Enregistrement...' : initialData ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
