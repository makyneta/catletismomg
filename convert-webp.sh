#!/bin/bash
# Converte todas as imagens JPG/PNG para WebP
# Uso: bash convert-webp.sh
# Requer: cwebp (instalar com: sudo apt install webp  ou  npm install -g cwebp)

set -e

DIRS=(
  "assets/images"
  "assets/images/news"
  "assets/images/slideshow"
)

convert_to_webp() {
  local file="$1"
  local webp="${file%.*}.webp"
  
  if [ -f "$webp" ]; then
    echo "  SKIP $webp (já existe)"
    return
  fi

  echo "  → $file → $webp"
  cwebp -q 82 "$file" -o "$webp" 2>/dev/null || \
  npx -y cwebp -q 82 "$file" -o "$webp" 2>/dev/null || \
  echo "  ERRO: não foi possível converter $file (instale cwebp)"
}

for dir in "${DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo ""
    echo "📁 $dir"
    find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
      convert_to_webp "$img"
    done
  fi
done

echo ""
echo "✅ Conversão concluída."
echo "📌 Nota: as imagens originais foram mantidas. Os ficheiros .webp foram criados ao lado."
