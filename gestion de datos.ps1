# Menu interactivo para gestionar el sistema
function Show-Menu {
    Clear-Host
    Write-Host "=== SISTEMA DE BIBLIOTECA ===" -ForegroundColor Cyan
    Write-Host "1. Ver todos los libros"
    Write-Host "2. Crear nuevo libro"
    Write-Host "3. Eliminar libro"
    Write-Host "4. Ver autores"
    Write-Host "5. Ver usuarios"
    Write-Host "6. Ver préstamos"
    Write-Host "Q. Salir"
}

do {
    Show-Menu
    $opcion = Read-Host "`nSelecciona una opción"
    
    switch ($opcion) {
        '1' {
            Write-Host "`n=== LIBROS ===" -ForegroundColor Green
            $libros = Invoke-RestMethod -Uri "http://localhost:3000/libros" -Method GET
            $libros | Format-Table id, titulo, autor, año, disponible -AutoSize
            Read-Host "Presiona Enter para continuar"
        }
        '2' {
            Write-Host "`n=== CREAR NUEVO LIBRO ===" -ForegroundColor Yellow
            $titulo = Read-Host "Título"
            $autor = Read-Host "Autor"
            $año = Read-Host "Año"
            
            $body = @{
                titulo = $titulo
                autor = $autor
                año = [int]$año
            } | ConvertTo-Json
            
            try {
                $resultado = Invoke-RestMethod -Uri "http://localhost:3000/libros" -Method POST -Body $body -ContentType "application/json"
                Write-Host "Libro creado exitosamente!" -ForegroundColor Green
                $resultado
            } catch {
                Write-Host "Error: $_" -ForegroundColor Red
            }
            Read-Host "Presiona Enter para continuar"
        }
        '3' {
            Write-Host "`n=== ELIMINAR LIBRO ===" -ForegroundColor Red
            $id = Read-Host "ID del libro a eliminar"
            try {
                Invoke-RestMethod -Uri "http://localhost:3000/libros/$id" -Method DELETE
                Write-Host "Libro eliminado exitosamente!" -ForegroundColor Green
            } catch {
                Write-Host "Error: $_" -ForegroundColor Red
            }
            Read-Host "Presiona Enter para continuar"
        }
        '4' {
            Write-Host "`n=== AUTORES ===" -ForegroundColor Green
            try {
                $autores = Invoke-RestMethod -Uri "http://localhost:3000/autores" -Method GET
                $autores | Format-Table -AutoSize
            } catch {
                Write-Host "Error al obtener autores: $_" -ForegroundColor Red
            }
            Read-Host "Presiona Enter para continuar"
        }
        '5' {
            Write-Host "`n=== USUARIOS ===" -ForegroundColor Green
            try {
                $usuarios = Invoke-RestMethod -Uri "http://localhost:3000/usuarios" -Method GET
                $usuarios | Format-Table -AutoSize
            } catch {
                Write-Host "Error al obtener usuarios: $_" -ForegroundColor Red
            }
            Read-Host "Presiona Enter para continuar"
        }
        '6' {
            Write-Host "`n=== PRÉSTAMOS ===" -ForegroundColor Green
            try {
                $prestamos = Invoke-RestMethod -Uri "http://localhost:3000/prestamos" -Method GET
                $prestamos | Format-Table -AutoSize
            } catch {
                Write-Host "Error al obtener préstamos: $_" -ForegroundColor Red
            }
            Read-Host "Presiona Enter para continuar"
        }
        'q' { Write-Host "Saliendo..." -ForegroundColor Yellow }
        default { Write-Host "Opción no válida" -ForegroundColor Red; Start-Sleep -Seconds 1 }
    }
} while ($opcion -ne 'q')