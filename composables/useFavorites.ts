import { onMounted } from 'vue'

export const useFavorites = () => {
  const favorites = useState<string[]>('favorites', () => [])

  const load = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favorites')
      if (stored) favorites.value = JSON.parse(stored)
    }
  }

  const save = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }

  const toggle = (id: string) => {
    favorites.value.includes(id)
      ? favorites.value = favorites.value.filter(f => f !== id)
      : favorites.value.push(id)
    save()
  }

  const isFavorite = (id: string) => {
    return favorites.value.includes(id)
  }

  onMounted(load)

  return { favorites, toggle, isFavorite }
}
