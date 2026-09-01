/**
 * ==========================================================================
 * MUEBLERÍA JOTA - ARRAY DE PRODUCTOS
 * ==========================================================================
 * Fuente única de datos de todos los productos del proyecto.
 * Cada objeto contiene la información necesaria para renderizar tanto las
 * Product Cards como la página de detalle de producto.
 *
 * Este archivo NO contiene lógica de renderizado: solo los datos.
 * Las páginas de ambiente filtran por la propiedad `ambiente`.
 * ==========================================================================
 */

// Array global de productos (accesible desde otros archivos .js)
export const PRODUCTOS = [
  /* ========================================================================
     AMBIENTE: LIVING
     ======================================================================== */
  {
    id: 'rack-noel',
    nombre: 'Rack Nöel',
    precio: 450000,
    ambiente: 'living',
    tipo: 'Rack de TV',
    descripcion: 'Rack de TV de líneas depuradas con puertas listonadas de nogal, pensado para organizar el living con elegancia y calidez.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBw1Cj2XG8OH8Qnv-7FSYiEyoZI6EJsXVmzm-WW7Nw2l4V3HhJHyPPdSCWRsU8NH8nhyVBbJF6Znpi3YWs7k17-BmpSTSVeKoj0IkztNJJ2km1evvj54pCqDRQ5caqvcgm5PMNwoEogKg3dsvft8xLxGYY5OrwKoqpLE6MpOPIq9eQhU3zqjwROLl9ESSQTq_vBNSnoaRHJKy8Hb5CW8w7UhLBEdk59mxTuz1tWilExe0tioo4g9EI'],
    material: 'Nogal con puertas listonadas',
    color: 'Nogal oscuro',
    dimensiones: 'Al 520 mm · An 1800 mm · Pr 400 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 14
  },
  {
    id: 'sofa-lum',
    nombre: 'Sofá Lüm',
    precio: 1250000,
    ambiente: 'living',
    tipo: 'Sofá modular',
    descripcion: 'Sofá modular tapizado en bouclé natural con estructura maciza, combina confort envolvente y una estética contemporánea de autor.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCVGKntDe0bUIeg1DpQnOHdg7RgG55UMV0V5Zdgmi0CWTpO_ejQftGNHQut4BO-z04qzZJbj64arm-sBrJGvM9wFptoAb1EEUqg_-UvnhusTR1O12f8nN1ZLgiE8Ncf7_m2Tv9CkONmQFL6PYbk2rpIoUnnsm6tzcWFxQPp7Yt7kB82SerBsQzIEaku-kUv85whADNeVWDE9NDLv5IFvDLHGAQzEVTNXi8EOwZrzA10TvA0plSY3Wk'],
    material: 'Bouclé natural y estructura maciza',
    color: 'Crema / Natural',
    dimensiones: 'Al 780 mm · An 2200 mm · Pr 950 mm',
    fabricacion: 'Argentina',
    calificacion: 4.9,
    reseñas: 21
  },
  {
    id: 'biblioteca-vora',
    nombre: 'Biblioteca Vora',
    precio: 680000,
    ambiente: 'living',
    tipo: 'Biblioteca',
    descripcion: 'Biblioteca asimétrica de estantes irregulares en fresno claro, una pieza escultural que ordena y da carácter al ambiente.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAh_eebf7t5VX0vjDTWyCNDsbRQ5rFHHadJX-QoRVb5mEqd0a168dZ-Bx3H4nSq3buCIawFsDfD5Y0jGYIDQfpLW-T6lVsC-jWBpRn8HR41_axLyTqD5l3hyK2IILT_FNJSF9WS4_Kj2XnjrVOzT6Bo79za2T5_FH0U1GzOMdBNTsNnI9KkZfzOtjN5NSN7wnO5j4oysw4wF6zWb3Vyaz-Uw_zvCguMMFumqo0d7U4ZvHvEYNK1xs8'],
    material: 'Fresno claro y estantes asimétricos',
    color: 'Fresno claro',
    dimensiones: 'Al 2000 mm · An 1400 mm · Pr 360 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 9
  },
  {
    id: 'aparador-ko',
    nombre: 'Aparador Kō',
    precio: 520000,
    ambiente: 'living',
    tipo: 'Aparador',
    descripcion: 'Aparador de roble oscuro con puertas en esterilla, aporta textura y orden al living con un aire delicado y sofisticado.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD1SeWe4-X1MNEdllaSkIXaSq5lJrAEmtWwsP-zYu1V-wOmsuvqVS6QN9IUGo0G2IHeZqOUGDNh_Nj5feLy_yT0T9ZfsNsEkFeDontpXJfP-ASYk8XycbJQJ79c8iBYCO2lnwCDHft_wh2IJNZI1AuRvl_7Sm5PM3aDqf02HLVisIjKk_vFtmS10-V-WP5-9BpdRPaggxqOU8o429HN7hAMj16j6a9Sz-90aMVlVB5DOBZG-kgJbq8'],
    material: 'Roble oscuro y puertas en esterilla',
    color: 'Roble oscuro',
    dimensiones: 'Al 760 mm · An 1600 mm · Pr 420 mm',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 11
  },

  /* ========================================================================
     AMBIENTE: COMEDOR
     ======================================================================== */
  {
    id: 'mesa-cienfuegos',
    nombre: 'Mesa Cienfuegos',
    precio: 2450000,
    ambiente: 'comedor',
    tipo: 'Mesa de comedor',
    descripcion: 'Mesa de comedor en nogal macizo para 8 a 10 comensales, protagonista indiscutida de reuniones memorables.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAmw2xR1OffSxJARJCwwsBv8Wnvtefn0ddoiTp_X3ePZzrAaJ3hjhOPp1xVax0jt9GpcAvol_R30URSwZ5hk89O1OqUDj2NfA705gpY1PBz0iKLOO4_EFuexLWT377rlPL-gz7D1cBzlC-TBbkGDEA8dRVZizm2dsyBQT2I0z96CdqyXSygj43L2zB7LVVpAyyGtx88avPB56zHAKj_TkrbqlKLwds67PUlnObcGxlmdFkxXfDs10Q'],
    material: 'Nogal macizo',
    color: 'Nogal oscuro',
    dimensiones: 'Al 750 mm · An 2400 mm · Pr 1100 mm',
    fabricacion: 'Argentina',
    calificacion: 4.9,
    reseñas: 32
  },
  {
    id: 'sillas-atrio',
    nombre: 'Sillas Atrio (Set 2)',
    precio: 890000,
    ambiente: 'comedor',
    tipo: 'Sillas',
    descripcion: 'Set de dos sillas con estructura en nogal y asiento de lino crema, diseño atemporal que complementa cualquier mesa.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAwoZe3ay5rTH1Ey0JYveJLDz3KY6LisKFdksIst2UmLbSswlG-kAMXahC0pNYwmXpPk1_Gea6Y2euv7Y2sPmIXGoUYB72NAwXzS0chnctlk-Pj_BrG6OQvj8agFJ7TiEkGZ2nqMjU2QtAR0g1ddFQ5h9ZAA71w_i70Xj7LCD8pi0igEdkIpXdk_6GsSzOQ9fhKZUOuG0vqlB5NF0yrJzIHs2rg5dMgsTyUc_SSoFx0sffjYA_t_4o'],
    material: 'Estructura en nogal y lino crema',
    color: 'Nogal / Crema',
    dimensiones: 'Al 850 mm · An 460 mm · Pr 520 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 18
  },
  {
    id: 'cava-sommelier',
    nombre: 'Cava Sommelier',
    precio: 3200000,
    ambiente: 'comedor',
    tipo: 'Cava',
    descripcion: 'Cava de vinos en roble oscuro con detalles en bronce, un mueble de autor para los amantes del vino y el diseño.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDamN_uK5RI_GqwrjD5vSdeoZ9IQpBjNq0J2RGamMHaoX9P95GCRH_qro4oNnZW06QBIlZK7UHZnF0708RS4tzbeUbvyD64PqyJHPC7gFN1C19gG1hl6LItGcwbIC7FF4PLo9CzJ_pCNs6bvG00NhH-jEsUPrNgjs80bv4UO7iUTkwJesuuGUuCDsShBzPfNKeXa84YlbvpjULFMewiDvr9MSBsTbvUaWugLVOySgh2ueHRbqTDink'],
    material: 'Roble oscuro y detalles en bronce',
    color: 'Roble oscuro / Bronce',
    dimensiones: 'Al 950 mm · An 1200 mm · Pr 450 mm',
    fabricacion: 'Argentina',
    calificacion: 5.0,
    reseñas: 7
  },
  {
    id: 'aparador-litoral',
    nombre: 'Aparador Litoral',
    precio: 1850000,
    ambiente: 'comedor',
    tipo: 'Aparador',
    descripcion: 'Aparador de fresno cálido con puertas invisibles, elegancia sutil y gran capacidad de guardado para el comedor.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCLploIJ_zbd8ofA44TVtMMtqZb2eZufAKd7dFm1ixJwdg6DuvgGddKZ5JTZulblPCy_lIebM7GKIyU6zGk27OQiC_vg79IeEbZLGTHoLkdsIU9dOhG2hjGPZ8A-kHN-zn7K0JgdtUu-hftG9sWofZV-RftAfwcHQxflp2Wg3SnZrLYqrFaqiRQBcbJj5_eTVgRKs8lYTqAtijgJljfwo4we8X3rQVD4BXV1gwMIi3vZAX7ABJcg90'],
    material: 'Fresno cálido con puertas invisibles',
    color: 'Fresno cálido',
    dimensiones: 'Al 820 mm · An 1900 mm · Pr 450 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 12
  },

  /* ========================================================================
     AMBIENTE: COCINA
     ======================================================================== */
  {
    id: 'alacena-suspendida',
    nombre: 'Alacena Suspendida',
    precio: 210000,
    ambiente: 'cocina',
    tipo: 'Alacena',
    descripcion: 'Alacena de pared en roble claro con puertas de vidrio esmerilado, funcional y luminosa para organizar la cocina.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCmbNrBuOAB836FN2GylP6K8cX-xrezhs85skwhaCyQkTSiQrUjhTyZSQ9eVO63PSq_zhBemKdprKJ3Kfdzi7NtrtIQYiYG0KDMI3yHQBbF-sy1h8TjkjJfDO8DiA0gt8oQ3b-3zuFLC6S8NyUvqNquvPXtvXazmXLkRs3UgIL-gK-CzDu_KWXqyJ05kH8F_fBFt_ZcLymouROTOALTdJUaw52bgJ_UZp6GQ2c6VR_2z0cFoNty9Do'],
    material: 'Roble claro y vidrio esmerilado',
    color: 'Roble claro',
    dimensiones: 'Al 900 mm · An 1200 mm · Pr 320 mm',
    fabricacion: 'Argentina',
    calificacion: 4.5,
    reseñas: 8
  },
  {
    id: 'barra-de-encuentro',
    nombre: 'Barra de Encuentro',
    precio: 385000,
    ambiente: 'cocina',
    tipo: 'Barra',
    descripcion: 'Barra con tapa maciza y banquetas integradas, perfecta para el desayuno y las reuniones informales en la cocina.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBRMFIDQAiTb_cxjF30S1eocxDy97BnCv2uZ0G6tuPtL__ocQL23_HLVFzxtEYdZtUEkadbvPeVfyxTg4Z_ulgXsEzFWfuVUJFcL5BhazNOBLU9_nwnkaY9_cg_WJsoi1o0N20fYPT8F_eJ2xr2AhGbFXMs0LhwddPzGcb1Jbmk6vCY4pL-LRq_o-Mfb65CVySdnl6B77_EjYH_SU8TqsGLkY9wvsJ1Jd8ZoTfon5UbmDPheaqSH9g'],
    material: 'Tapa maciza y banquetas integradas',
    color: 'Nogal / Natural',
    dimensiones: 'Al 900 mm · An 1600 mm · Pr 600 mm',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 10
  },
  {
    id: 'modulo-base-integral',
    nombre: 'Módulo Base Integral',
    precio: 520000,
    ambiente: 'cocina',
    tipo: 'Módulo de cocina',
    descripcion: 'Módulo base para cocina con cajoneras de cierre suave y mesada de mármol, máximo aprovechamiento del espacio.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAXi9-c6hMSnSJ8Wm9oOBcDPhkesQCXQE1Ulr3742KQHFfPhEp7VZoPuKsdN8a6lVWDBjN_ttMoYKG_RXD8O5BoPMG65sFupCmnDCsffLyuz-aL5D43DEuLzr0r4nfFjxwPTE7WTIPMzx6_x-5xS9ffIlZsUYS6ZodaLqZ9DxfLHr-U4pnZV1PFpR9ffRYnmHCY7iYqfubhBAEoQG0ZS_Dqc13yZ6D7aQlxa4qL1HRCWDYdZ8jAzOE'],
    material: 'Cajoneras cierre suave y mármol',
    color: 'Roble / Mármol',
    dimensiones: 'Al 860 mm · An 1800 mm · Pr 600 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 15
  },
  {
    id: 'isla-gourmet',
    nombre: 'Isla Gourmet',
    precio: 920000,
    ambiente: 'cocina',
    tipo: 'Isla de cocina',
    descripcion: 'Isla central en nogal macizo con espacio desayunador, el corazón funcional y estético de la cocina moderna.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCWGhu_HJftlrP3K2dw55fKHeANaJs1Dw0GbaX8F1jqkVF4RRGpffYPGE8gD1zRge8rqoKxsZViwXLwIGnb6IwRvpVD7g0vjQHV5VwXyHIZmjJsUBMNv0zHKS1h1h5MpRF7IJophPlsvnHj3VJZ-GXXJczqFG6fQCZHYBeBwRuIGOckETGea2H36FcRVafV94-uW8zqQpz9Oy5dxPUAoUxMakB-7q8oRi6scrror-8ZjOOl8w9RuWM'],
    material: 'Nogal macizo con espacio desayunador',
    color: 'Nogal oscuro',
    dimensiones: 'Al 900 mm · An 2200 mm · Pr 1100 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 19
  },

  /* ========================================================================
     AMBIENTE: DORMITORIO
     ======================================================================== */
  {
    id: 'cama-serena',
    nombre: 'Cama Serena',
    precio: 780000,
    ambiente: 'dormitorio',
    tipo: 'Cama',
    descripcion: 'Cama baja en nogal con cabecero tapizado en lino puro, serenidad y confort para el descanso.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDh8FBGl134sc2RMz3Gt960TAjqVl1ykosY7H3f-OvL0odoPZiFxdsrzQyGUggAJJE0jw4k4BHrW7eHOx0qFWL-dPoy4mMQquyl3szMm8wpGCpV3k70wgN-0P_eU6VjIDGVQdjcjYYtz3ENy5qMfrmL19WIMDyI1MLqG0GEqxweuQYtjufrMSG2RCLatGzX1x1QR9PprqfS7RJYb3FLIuAYMgaFgwYsJzJ8JNsz9Wm-h4La6OMKQxk'],
    material: 'Nogal y respaldo tapizado en lino puro',
    color: 'Nogal / Lino',
    dimensiones: 'Al 800 mm · An 1600 mm · Pr 2000 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 16
  },
  {
    id: 'mesas-de-luz-duo',
    nombre: 'Mesas de Luz Dúo',
    precio: 260000,
    ambiente: 'dormitorio',
    tipo: 'Mesas de luz',
    descripcion: 'Set de dos mesas de luz flotantes en roble claro con cajón oculto, minimalismo funcional para el dormitorio.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDLblHmZwWjuSfr71DJs8sgWvSGyk_RS5-SXOpuCglsixW37OY6OLwXObO-i9nIRP5O-yCmP4xpNWTlAtV3pDozuLRFgQKBHDfAXSpqH051EQG8721kIrYa04DNaDQf9656uCyrp5DKfwJhsM0J929n8YnoMgEBbLa1llL3bFrOK2qWw0l-ra_6tVeCdZQE5CYvTJxH9FCxX5n7kUGESahTSqT2GVdXYxNyggrPH41UXL4hg1y0hhI'],
    material: 'Roble claro con cajón oculto',
    color: 'Roble claro',
    dimensiones: 'Al 450 mm · An 420 mm · Pr 350 mm (c/u)',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 13
  },
  {
    id: 'banco-trenza',
    nombre: 'Banco Trenza',
    precio: 180000,
    ambiente: 'dormitorio',
    tipo: 'Banco',
    descripcion: 'Banco al pie de cama en cuero vacuno trenzado y petiribí, textura y calidez artesanal.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAGB7wAWs5gs2pglasTf_EAzHfw8bWRlbCdHt4Auo5xvlXQ0FPiYHU1AFE5VFu929tccdxDzPz0EykXedFNU6Gx_6HZuV2UXYBwopaljKrwytGJB8HZrrUBSkQpSIZpYDTmBZpTFjykNpz1ODd2Tqb7rdSC3IDAAgTqTFlZYfD1Z3656SdG-MKH4vtD6AmHrUa8lLQ0-P34WL6827FdWeTBzaG4o9RjD-dIwpcCvXVL8Tim28l4NtM'],
    material: 'Cuero vacuno trenzado y petiribí',
    color: 'Cuero / Petiribí',
    dimensiones: 'Al 450 mm · An 1200 mm · Pr 400 mm',
    fabricacion: 'Argentina',
    calificacion: 4.5,
    reseñas: 6
  },
  {
    id: 'comoda-origen',
    nombre: 'Cómoda Origen',
    precio: 590000,
    ambiente: 'dormitorio',
    tipo: 'Cómoda',
    descripcion: 'Cómoda de 6 cajones amplios en madera maciza, orden y estilo para el dormitorio principal.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCLploIJ_zbd8ofA44TVtMMtqZb2eZufAKd7dFm1ixJwdg6DuvgGddKZ5JTZulblPCy_lIebM7GKIyU6zGk27OQiC_vg79IeEbZLGTHoLkdsIU9dOhG2hjGPZ8A-kHN-zn7K0JgdtUu-hftG9sWofZV-RftAfwcHQxflp2Wg3SnZrLYqrFaqiRQBcbJj5_eTVgRKs8lYTqAtijgJljfwo4we8X3rQVD4BXV1gwMIi3vZAX7ABJcg90'],
    material: '6 cajones amplios en madera maciza',
    color: 'Nogal',
    dimensiones: 'Al 880 mm · An 1600 mm · Pr 500 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 14
  },

  /* ========================================================================
     AMBIENTE: OFICINA
     ======================================================================== */
  {
    id: 'escritorio-pro',
    nombre: 'Escritorio PRO',
    precio: 650000,
    ambiente: 'oficina',
    tipo: 'Escritorio',
    descripcion: 'Escritorio ejecutivo en nogal macizo con pasacables oculto, diseño ergonómico para trabajar con estilo.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDXwd67D8JM4YicgkKG5R-tCvw2G91Tk8V1g66dZ8oH__x9hc727Cd_W0ZUKd9iCE0F95X8qtTmyceBZFbEv2fpE0vX-KS980hKogAXOWLrrfpzVCMrI5xt4D_IhJGhT2ERx8DUDvDG3Ls1JGFu3BjcRzCv0LnmMpLGLZNXZZYZpT4J1jC0FEOzfJMU0k2eCeYydwzsttUR2_xgr9zpL6jh_gVrW6v5ZbjsU0oftoZqwpihzejK2bU'],
    material: 'Nogal macizo con pasacables oculto',
    color: 'Nogal oscuro',
    dimensiones: 'Al 750 mm · An 1600 mm · Pr 800 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 20
  },
  {
    id: 'estanteria-vertice',
    nombre: 'Estantería Vértice',
    precio: 420000,
    ambiente: 'oficina',
    tipo: 'Estantería',
    descripcion: 'Estantería de estructura metálica y estantes de fresno, geometría moderna para archivo y exhibición.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAYcspguRhQG0gbPJzuNzi5coCtRgTVz7T45f9ScT62sjDyrCN94G8iisQtcpLLpxVZ0CyIjQIDDlhSvoehCw_4b2Vuizl87ju5XJSYm-53vLzB-PULux-JaXNQiY3NS9M5VNTKcckCled78QTWSbPDkRyTXGlj0y3rr8rCph70hfjAdNUdhnYP5SXg5vPOLhW5xRUrInT0ZAuIJscLpTTNJ-5A6wTbCW1iScM_0B81TvIxNRbZkG4'],
    material: 'Estructura metálica y estantes de fresno',
    color: 'Metal / Fresno',
    dimensiones: 'Al 2000 mm · An 900 mm · Pr 350 mm',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 9
  },
  {
    id: 'silla-ejecutiva-cuero',
    nombre: 'Silla Ejecutiva Cuero',
    precio: 340000,
    ambiente: 'oficina',
    tipo: 'Silla de oficina',
    descripcion: 'Silla de oficina artesanal en cuero vacuno genuino y base de nogal, confort premium para la jornada laboral.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAzKmxIqR0jDT5SOIC_W0ka-Wja053SaLZ3NGIHwQFLfFoIKxLctLTlEfQrrOisM4VCEWnrfsGNviN1rNavMzFg9VyX_bQfnH1A-B8gSGmHoBFTvCIqPOy2TtESjf2HB3iANXZvtnr2AYBxSWq5QghH6hEXVVo29dj8iXlbi0rbR8aJJZxq8PpHnL_PJ1wjSlDx3MwdjqiuAk9jg5fp8uWBMN6-YkS8P269wrsRZEvdgajrkGmm1IE'],
    material: 'Cuero vacuno genuino y base de nogal',
    color: 'Cuero / Nogal',
    dimensiones: 'Al 1100 mm · An 640 mm · Pr 640 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 17
  },
  {
    id: 'cajonera-rodante',
    nombre: 'Cajonera Rodante',
    precio: 190000,
    ambiente: 'oficina',
    tipo: 'Cajonera',
    descripcion: 'Cajonera rodante de madera maciza con ruedas embutidas silenciosas, practicidad y orden al alcance de la mano.',
    imagenes: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD83F6YflVYv5hj81m9-P7TlZ4iuHlISJiAiS1PJkNYVbH-B5we6jCXlfaYmDl5Ewd_1pBPuTSOnLHI_zTq2owkAJlhw6bB1npKQ8ubFys0HL2G1hYKhIC6DR1mAOD8CvLTTyo_40n7tNUJAotjWayhQNRX5f7emZnjimMtUJrMkPqSx40teNzFFnuKNPJ6gkZzztkHHcA42cs6Sh5LAuqBzQzS1xpL_00YnZeiVwYpy8B_4F7rjk0'],
    material: 'Nogal con ruedas embutidas silenciosas',
    color: 'Nogal',
    dimensiones: 'Al 620 mm · An 420 mm · Pr 520 mm',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 12
  }
];

/**
 * Devuelve los productos de un ambiente determinado (minúsculas).
 * @param {string} ambiente - 'living', 'comedor', 'cocina', 'oficina' o 'dormitorio'
 * @returns {Array} productos que coinciden con el ambiente
 */
export function productosPorAmbiente(ambiente) {
  return PRODUCTOS.filter((producto) => producto.ambiente === ambiente);
}

/**
 * Busca un producto por su id.
 * @param {string} id - Identificador único del producto
 * @returns {Object|undefined} el producto encontrado o undefined
 */
export function productoPorId(id) {
  return PRODUCTOS.find((producto) => producto.id === id);
}

/**
 * Formatea un número a precio en pesos argentinos.
 * @param {number} numero - Ej: 450000
 * @returns {string} Ej: "$450.000"
 */
export function formatearPrecio(numero) {
  return '$' + numero.toLocaleString('es-AR');
}
