$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$mediaRoot = (Resolve-Path (Join-Path $projectRoot "public\media")).Path
$ffmpeg = (Get-Command ffmpeg -ErrorAction Stop).Source
$files = Get-ChildItem -LiteralPath $mediaRoot -Filter "*.mp4" -File | Sort-Object Name

for ($index = 0; $index -lt $files.Count; $index += 1) {
  $file = $files[$index]
  $output = Join-Path $mediaRoot "$($file.BaseName).compressed.mp4"
  Write-Output "[$($index + 1)/$($files.Count)] $($file.Name)"

  & $ffmpeg `
    -hide_banner `
    -loglevel error `
    -y `
    -i $file.FullName `
    -map "0:v:0" `
    -map "0:a?" `
    -vf "scale=w=960:h=960:force_original_aspect_ratio=decrease:force_divisible_by=2" `
    -c:v libx264 `
    -preset medium `
    -crf 31 `
    -pix_fmt yuv420p `
    -c:a aac `
    -b:a 64k `
    -movflags +faststart `
    $output

  if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $output)) {
    throw "Compression failed for $($file.Name)"
  }

  Move-Item -LiteralPath $output -Destination $file.FullName -Force
}

$totalBytes = (Get-ChildItem -LiteralPath $mediaRoot -Filter "*.mp4" -File | Measure-Object Length -Sum).Sum
Write-Output ("MP4_MB={0}" -f [math]::Round($totalBytes / 1MB, 2))

