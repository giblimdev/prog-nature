//@/app/food/recette/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  Euro,
} from 'lucide-react'
import RecetteForm from '@/components/recettes/RecetteForm'

// Définition du type Categorie basé sur schéma Prisma
type Categorie = 'ENTREE' | 'PLAT' | 'DESSERT' | 'BOISSON'

// Type pour les relations (non chargées dans cette vue)
interface RecetteIngredient {
  id: string
  recetteId: string
  ingredientId: string
  quantite: number
  unite: string
}

interface CommandeItem {
  id: string
  commandeId: string
  recetteId: string
  quantite: number
  prixUnitaire: number
  commentaire: string | null
}

// Interface complète Recette selon schéma Prisma
interface Recette {
  id: string
  name: string
  carte: string | null
  order: number | null
  coutPreparation: number
  tempsPreparation: number
  description: string
  image: string | null
  tags: string[]
  categorie: Categorie
  prixVente: number
  etapes: string[]
  estActif: boolean
  createdAt: Date
  updatedAt: Date
  ingredientsRecipes: RecetteIngredient[]
  commandeItems: CommandeItem[]
}

// Interface du formulaire recette (sans relations)
type RecetteFormData = {
  name: string
  description: string
  coutPreparation: number
  tempsPreparation: number
  prixVente: number
  categorie: Categorie
  etapes: string[]
  tags: string[]
  estActif: boolean
  carte?: string | null
  order?: number | null
  image?: string | null
}

export default function RecettesPage() {
  const [recettes, setRecettes] = useState<Recette[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRecette, setEditingRecette] = useState<Recette | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Charger les recettes via API
  useEffect(() => {
    const fetchRecettes = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/recettes')
        if (response.ok) {
          const data: Recette[] = await response.json()
          setRecettes(
            data.map((r) => ({
              ...r,
              createdAt: new Date(r.createdAt),
              updatedAt: new Date(r.updatedAt),
            }))
          )
        } else {
          setRecettes([])
          console.error('Erreur chargement recettes')
        }
      } catch (error) {
        console.error('Erreur fetch recettes:', error)
        setRecettes([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchRecettes()
  }, [])

  // Filtrer recettes selon terme recherche
  const filteredRecettes = recettes.filter((recette) =>
    [recette.name, recette.description, ...recette.tags]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  // Ouvre formulaire création recette
  const handleCreateRecette = () => {
    setEditingRecette(null)
    setIsDialogOpen(true)
  }

  // Ouvre formulaire modification
  const handleEditRecette = (recette: Recette) => {
    setEditingRecette(recette)
    setIsDialogOpen(true)
  }

  // Supprime une recette
  const handleDeleteRecette = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      try {
        const response = await fetch(`/api/recettes/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setRecettes(recettes.filter((r) => r.id !== id))
        } else {
          alert('Erreur lors de la suppression')
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  // Soumet les données formulaire (création ou modification)
  const handleSubmitRecette = async (data: RecetteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(
        editingRecette ? `/api/recettes/${editingRecette.id}` : '/api/recettes',
        {
          method: editingRecette ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )
      if (!response.ok) throw new Error('Erreur lors de la sauvegarde')
      const savedRecette: Recette = await response.json()
      setRecettes((prev) =>
        editingRecette
          ? prev.map((r) => (r.id === editingRecette.id ? savedRecette : r))
          : [...prev, savedRecette]
      )
      setIsDialogOpen(false)
      setEditingRecette(null)
    } catch (error: unknown) {
      console.error('Erreur lors de la sauvegarde:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Couleurs pour catégories
  const getCategorieColor = (cat: Categorie) => {
    const colors: Record<Categorie, string> = {
      ENTREE: 'bg-blue-100 text-blue-800',
      PLAT: 'bg-green-100 text-green-800',
      DESSERT: 'bg-purple-100 text-purple-800',
      BOISSON: 'bg-orange-100 text-orange-800',
    }
    return colors[cat] ?? 'bg-gray-100 text-gray-800'
  }

  // Libellés user-friendly catégories
  const getCategorieLabel = (cat: Categorie) => {
    const labels: Record<Categorie, string> = {
      ENTREE: 'Entrée',
      PLAT: 'Plat',
      DESSERT: 'Dessert',
      BOISSON: 'Boisson',
    }
    return labels[cat] ?? cat
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Liste des recettes</h1>
          <p className="text-gray-600 mt-1">
            Gérez les recettes de votre restaurant ({recettes.length}{' '}
            recette{recettes.length > 1 ? 's' : ''})
          </p>
        </div>
        <Button onClick={handleCreateRecette} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle recette
        </Button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Rechercher une recette..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Coût / Prix</TableHead>
              <TableHead>Temps</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecettes.map((recette) => {
              const marge = recette.prixVente - recette.coutPreparation
              const margePourcentage =
                recette.prixVente > 0 ? (marge / recette.prixVente) * 100 : 0

              return (
                <TableRow key={recette.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{recette.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {recette.description}
                      </div>
                      {recette.carte && (
                        <div className="text-xs text-gray-400 mt-1">
                          Carte: {recette.carte}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getCategorieColor(recette.categorie)}
                    >
                      {getCategorieLabel(recette.categorie)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Euro className="h-3 w-3" />
                        Coût: {recette.coutPreparation.toFixed(2)}€
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Euro className="h-3 w-3" />
                        Vente: {recette.prixVente.toFixed(2)}€
                      </div>
                      <div
                        className={`text-xs ${
                          margePourcentage >= 30
                            ? 'text-green-600'
                            : margePourcentage >= 20
                            ? 'text-orange-600'
                            : 'text-red-600'
                        }`}
                      >
                        Marge: {margePourcentage.toFixed(1)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {recette.tempsPreparation} min
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {recette.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {recette.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{recette.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={recette.estActif ? 'default' : 'secondary'}>
                      {recette.estActif ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditRecette(recette)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteRecette(recette.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {filteredRecettes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              {searchTerm
                ? "Aucune recette ne correspond à votre recherche"
                : "Aucune recette trouvée"}
            </div>
            {!searchTerm && (
              <Button onClick={handleCreateRecette} variant="outline">
                Créer votre première recette
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Dialog pour création/modification */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRecette ? 'Modifier la recette' : 'Créer une nouvelle recette'}
            </DialogTitle>
            <DialogDescription>
              {editingRecette
                ? 'Modifiez les informations de votre recette'
                : 'Remplissez les informations pour créer une nouvelle recette'}
            </DialogDescription>
          </DialogHeader>

          <RecetteForm
            initialData={editingRecette || undefined}
            onSubmit={handleSubmitRecette}
            onCancel={() => {
              setIsDialogOpen(false)
              setEditingRecette(null)
            }}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}