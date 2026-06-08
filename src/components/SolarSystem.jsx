import { useEffect, useRef, useState } from 'react'

const planets = [
  {
    name: 'Mercury',
    vi: 'Sao Thủy',
    radius: 4,
    orbit: 48,
    speed: 4.15,
    color: '#b9a48d',
    texture: ['#d7c0a6', '#8c7b68', '#6f635a'],
    diameter: '4.879 km',
    day: '58,6 ngày Trái Đất',
    year: '88 ngày Trái Đất',
    distance: '57,9 triệu km',
    note: 'Hành tinh nhỏ nhất và gần Mặt Trời nhất trong hệ mặt trời.',
  },
  {
    name: 'Venus',
    vi: 'Sao Kim',
    radius: 6,
    orbit: 72,
    speed: 1.62,
    color: '#e8c27a',
    texture: ['#ffe0a4', '#d79a4c', '#8f6335'],
    diameter: '12.104 km',
    day: '243 ngày Trái Đất',
    year: '225 ngày Trái Đất',
    distance: '108,2 triệu km',
    note: 'Có khí quyển dày, nhiệt độ bề mặt rất cao và sáng nổi bật trên bầu trời.',
  },
  {
    name: 'Earth',
    vi: 'Trái Đất',
    radius: 6.5,
    orbit: 100,
    speed: 1,
    color: '#4ea3ff',
    texture: ['#63b8ff', '#2c7d4f', '#f4f7ff'],
    moon: true,
    diameter: '12.742 km',
    day: '24 giờ',
    year: '365,25 ngày',
    distance: '149,6 triệu km',
    note: 'Hành tinh có nước lỏng, khí quyển phù hợp và là nơi có sự sống.',
  },
  {
    name: 'Mars',
    vi: 'Sao Hỏa',
    radius: 5,
    orbit: 132,
    speed: 0.53,
    color: '#d36b45',
    texture: ['#ef8a5a', '#9e3f2d', '#f1c194'],
    diameter: '6.779 km',
    day: '24 giờ 37 phút',
    year: '687 ngày Trái Đất',
    distance: '227,9 triệu km',
    note: 'Được gọi là hành tinh đỏ, có núi lửa lớn và dấu vết nước cổ đại.',
  },
  {
    name: 'Jupiter',
    vi: 'Sao Mộc',
    radius: 15,
    orbit: 180,
    speed: 0.084,
    color: '#d7b48a',
    texture: ['#f0d6aa', '#b98355', '#fff1d3'],
    diameter: '139.820 km',
    day: '9 giờ 56 phút',
    year: '11,86 năm Trái Đất',
    distance: '778,5 triệu km',
    note: 'Hành tinh lớn nhất hệ mặt trời, nổi bật với các dải mây và cơn bão lớn.',
  },
  {
    name: 'Saturn',
    vi: 'Sao Thổ',
    radius: 13,
    orbit: 230,
    speed: 0.034,
    color: '#d9c081',
    texture: ['#f1d99a', '#ad8c53', '#fff0bc'],
    ring: true,
    diameter: '116.460 km',
    day: '10 giờ 42 phút',
    year: '29,45 năm Trái Đất',
    distance: '1,43 tỷ km',
    note: 'Nổi tiếng với hệ vòng đai rộng và đẹp nhất trong các hành tinh.',
  },
  {
    name: 'Uranus',
    vi: 'Sao Thiên Vương',
    radius: 10,
    orbit: 278,
    speed: 0.012,
    color: '#8bd6df',
    texture: ['#a7edf0', '#65b6c7', '#d6ffff'],
    diameter: '50.724 km',
    day: '17 giờ 14 phút',
    year: '84 năm Trái Đất',
    distance: '2,87 tỷ km',
    note: 'Có trục quay nghiêng mạnh, gần như nằm ngang so với mặt phẳng quỹ đạo.',
  },
  {
    name: 'Neptune',
    vi: 'Sao Hải Vương',
    radius: 10,
    orbit: 322,
    speed: 0.006,
    color: '#5275ff',
    texture: ['#7fa1ff', '#2444b8', '#b9c8ff'],
    diameter: '49.244 km',
    day: '16 giờ 6 phút',
    year: '164,8 năm',
    distance: '4,5 tỷ km',
    note: 'Hành tinh xa nhất, có màu xanh đậm và những cơn gió rất mạnh.',
  },
]

const createStars = (count) => Array.from({ length: count }, () => ({
  x: Math.random() * 2 - 1,
  y: Math.random() * 2 - 1,
  z: Math.random() * 2 - 1,
  size: Math.random() * 1.8 + 0.25,
  alpha: Math.random() * 0.7 + 0.22,
  twinkle: Math.random() * Math.PI * 2,
}))

const createDust = (count) => Array.from({ length: count }, () => ({
  x: Math.random(),
  y: Math.random(),
  radius: Math.random() * 1.8 + 0.4,
  alpha: Math.random() * 0.18 + 0.04,
  drift: Math.random() * Math.PI * 2,
}))

const createMeteors = (count) => Array.from({ length: count }, () => ({
  x: Math.random(),
  y: Math.random(),
  length: Math.random() * 120 + 80,
  speed: Math.random() * 0.12 + 0.05,
  delay: Math.random() * 12,
}))

const createAsteroids = (count) => Array.from({ length: count }, () => ({
  angle: Math.random() * Math.PI * 2,
  orbit: Math.random() * 36 + 145,
  y: Math.random() * 10 - 5,
  size: Math.random() * 1.8 + 0.6,
  speed: Math.random() * 0.08 + 0.02,
  alpha: Math.random() * 0.35 + 0.18,
}))

const normalizeAngle = (angle) => {
  const full = Math.PI * 2
  return ((angle % full) + full) % full
}

const getPlanetZoom = (planet) => Math.max(6.2, Math.min(10.4, 11.2 - planet.radius * 0.28))

const SolarSystem = () => {
  const canvasRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(null)
  const hitRef = useRef([])
  const selectedPlanetRef = useRef(null)
  const stateRef = useRef({
    yaw: -0.45,
    pitch: 0.62,
    zoom: 1.05,
    targetZoom: 1.05,
    focus: { x: 0, y: 0, z: 0 },
    targetFocus: { x: 0, y: 0, z: 0 },
    time: 0,
    dragging: false,
    moved: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  })
  const starsRef = useRef(createStars(760))
  const dustRef = useRef(createDust(120))
  const meteorsRef = useRef(createMeteors(9))
  const asteroidsRef = useRef(createAsteroids(170))
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    selectedPlanetRef.current = selectedPlanet
  }, [selectedPlanet])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === stageRef.current)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let lastTime = performance.now()
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const rotatePoint = (point) => {
      const state = stateRef.current
      const cy = Math.cos(state.yaw)
      const sy = Math.sin(state.yaw)
      const cp = Math.cos(state.pitch)
      const sp = Math.sin(state.pitch)

      const x = point.x * cy - point.z * sy
      const z = point.x * sy + point.z * cy
      const y2 = point.y * cp - z * sp
      const z2 = point.y * sp + z * cp

      return { x, y: y2, z: z2 }
    }

    const project = (point, width, height) => {
      const state = stateRef.current
      const focusedPoint = {
        x: point.x - state.focus.x,
        y: point.y - state.focus.y,
        z: point.z - state.focus.z,
      }
      const rotated = rotatePoint(focusedPoint)
      const cameraDistance = 760
      const depth = cameraDistance + rotated.z
      const perspective = cameraDistance / Math.max(80, depth)
      const scale = perspective * state.zoom

      return {
        x: width / 2 + rotated.x * scale,
        y: height / 2 + rotated.y * scale,
        z: rotated.z,
        scale,
        visible: depth > 0,
      }
    }

    const drawGlowCircle = (x, y, radius, color, glow = 18) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius + glow)
      gradient.addColorStop(0, color)
      gradient.addColorStop(0.55, color)
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius + glow, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawSpace = (width, height, time) => {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, width, height)

      dustRef.current.forEach((dust) => {
        const x = ((dust.x * width) + Math.sin(time * 0.15 + dust.drift) * 18) % width
        const y = ((dust.y * height) + Math.cos(time * 0.12 + dust.drift) * 12) % height
        ctx.globalAlpha = dust.alpha
        ctx.fillStyle = '#d8e7ff'
        ctx.beginPath()
        ctx.arc(x, y, dust.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    const drawMeteors = (width, height, time) => {
      meteorsRef.current.forEach((meteor) => {
        const cycle = (time * meteor.speed + meteor.delay) % 1
        if (cycle > 0.35) return
        const progress = cycle / 0.35
        const x = meteor.x * width + progress * width * 0.55
        const y = meteor.y * height + progress * height * 0.18
        const gradient = ctx.createLinearGradient(x, y, x - meteor.length, y - meteor.length * 0.32)
        gradient.addColorStop(0, 'rgba(255,255,255,0.92)')
        gradient.addColorStop(0.24, 'rgba(139,194,255,0.34)')
        gradient.addColorStop(1, 'rgba(139,194,255,0)')
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.8
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x - meteor.length, y - meteor.length * 0.32)
        ctx.stroke()
      })
    }

    const drawAsteroidBelt = (width, height, time) => {
      asteroidsRef.current.forEach((asteroid) => {
        const angle = asteroid.angle + time * asteroid.speed
        const p = project({
          x: Math.cos(angle) * asteroid.orbit,
          y: asteroid.y,
          z: Math.sin(angle) * asteroid.orbit,
        }, width, height)
        if (!p.visible) return
        ctx.globalAlpha = asteroid.alpha
        ctx.fillStyle = '#c7b79b'
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.5, asteroid.size * p.scale), 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    const drawSunFlares = (x, y, scale) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(stateRef.current.time * 0.18)
      for (let i = 0; i < 8; i += 1) {
        ctx.rotate(Math.PI / 4)
        const flare = ctx.createLinearGradient(0, 0, 88 * scale, 0)
        flare.addColorStop(0, 'rgba(255,234,133,0.42)')
        flare.addColorStop(1, 'rgba(255,126,48,0)')
        ctx.fillStyle = flare
        ctx.beginPath()
        ctx.ellipse(46 * scale, 0, 58 * scale, 6 * scale, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const drawVignette = (width, height) => {
      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.5, Math.min(width, height) * 0.25, width * 0.5, height * 0.5, Math.max(width, height) * 0.72)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.58)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)
    }

    const drawOrbit = (orbit, width, height) => {
      ctx.beginPath()
      const steps = 260
      for (let i = 0; i <= steps; i += 1) {
        const a = (Math.PI * 2 * i) / steps
        const p = project({ x: Math.cos(a) * orbit, y: 0, z: Math.sin(a) * orbit }, width, height)
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.strokeStyle = 'rgba(190,213,255,0.16)'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 10])
      ctx.stroke()
      ctx.setLineDash([])
    }

    const drawStars = (width, height, time) => {
      starsRef.current.forEach((star) => {
        const p = project({ x: star.x * 1250, y: star.y * 760, z: star.z * 1250 }, width, height)
        if (!p.visible) return
        ctx.globalAlpha = star.alpha + Math.sin(time * 2 + star.twinkle) * 0.16
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(p.x, p.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    const drawLabel = (text, x, y, isSelected) => {
      ctx.font = isSelected ? '700 13px Mona Sans, Arial' : '12px Mona Sans, Arial'
      ctx.fillStyle = isSelected ? '#e7d393' : 'rgba(255,255,255,0.72)'
      ctx.textAlign = 'center'
      ctx.shadowColor = 'rgba(0,0,0,0.75)'
      ctx.shadowBlur = 8
      ctx.fillText(text, x, y)
      ctx.shadowBlur = 0
    }

    const drawPlanetBody = (planet, x, y, radius, spin) => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.clip()

      const base = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.42, radius * 0.1, x, y, radius * 1.1)
      base.addColorStop(0, planet.texture[0])
      base.addColorStop(0.55, planet.color)
      base.addColorStop(1, '#070812')
      ctx.fillStyle = base
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)

      for (let i = -3; i <= 3; i += 1) {
        const stripeY = y + (i * radius) / 4 + Math.sin(spin + i) * radius * 0.08
        const stripeHeight = Math.max(1.2, radius * (planet.name === 'Jupiter' || planet.name === 'Saturn' ? 0.16 : 0.08))
        ctx.globalAlpha = planet.name === 'Earth' ? 0.35 : 0.28
        ctx.fillStyle = i % 2 === 0 ? planet.texture[1] : planet.texture[2]
        ctx.beginPath()
        ctx.ellipse(x + Math.sin(spin * 0.9 + i) * radius * 0.45, stripeY, radius * 1.25, stripeHeight, Math.sin(spin) * 0.12, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      const shade = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.35, radius * 0.15, x + radius * 0.25, y + radius * 0.25, radius * 1.1)
      shade.addColorStop(0, 'rgba(255,255,255,0.28)')
      shade.addColorStop(0.48, 'rgba(255,255,255,0.03)')
      shade.addColorStop(1, 'rgba(0,0,0,0.62)')
      ctx.fillStyle = shade
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      ctx.strokeStyle = 'rgba(255,255,255,0.18)'
      ctx.lineWidth = Math.max(0.6, radius * 0.035)
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    const draw = (now) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const delta = Math.min(0.04, (now - lastTime) / 1000)
      lastTime = now
      const state = stateRef.current
      if (isPlaying) state.time += delta * speed
      state.zoom += (state.targetZoom - state.zoom) * 0.14

      const planetPoints = planets.map((planet, index) => {
        const angle = state.time * planet.speed + index * 0.9
        const x = Math.cos(angle) * planet.orbit
        const z = Math.sin(angle) * planet.orbit
        const y = Math.sin(angle * 0.33 + index) * 4
        return { planet, point: { x, y, z }, angle, index }
      })

      const selectedPoint = planetPoints.find(({ planet }) => selectedPlanetRef.current?.name === planet.name)
      state.targetFocus = selectedPoint ? selectedPoint.point : { x: 0, y: 0, z: 0 }
      state.focus.x += (state.targetFocus.x - state.focus.x) * 0.12
      state.focus.y += (state.targetFocus.y - state.focus.y) * 0.12
      state.focus.z += (state.targetFocus.z - state.focus.z) * 0.12

      ctx.clearRect(0, 0, width, height)
      drawSpace(width, height, state.time)
      drawStars(width, height, state.time)
      drawMeteors(width, height, state.time)
      planets.forEach((planet) => drawOrbit(planet.orbit, width, height))
      drawAsteroidBelt(width, height, state.time)

      const sun = project({ x: 0, y: 0, z: 0 }, width, height)
      drawGlowCircle(sun.x, sun.y, 24 * sun.scale, 'rgba(255,222,94,0.95)', 48 * sun.scale)
      drawSunFlares(sun.x, sun.y, sun.scale)
      const sunGradient = ctx.createRadialGradient(sun.x - 8, sun.y - 9, 2, sun.x, sun.y, Math.max(13, 18 * sun.scale))
      sunGradient.addColorStop(0, '#fff8b8')
      sunGradient.addColorStop(0.5, '#ffd04b')
      sunGradient.addColorStop(1, '#e9792e')
      ctx.fillStyle = sunGradient
      ctx.beginPath()
      ctx.arc(sun.x, sun.y, Math.max(12, 18 * sun.scale), 0, Math.PI * 2)
      ctx.fill()
      drawLabel('Mặt Trời', sun.x, sun.y + 36 * sun.scale, false)

      const sortedPlanetPoints = planetPoints.sort((a, b) => {
        const aPoint = {
          x: a.point.x - state.focus.x,
          y: a.point.y - state.focus.y,
          z: a.point.z - state.focus.z,
        }
        const bPoint = {
          x: b.point.x - state.focus.x,
          y: b.point.y - state.focus.y,
          z: b.point.z - state.focus.z,
        }
        return rotatePoint(aPoint).z - rotatePoint(bPoint).z
      })

      const hits = []

      sortedPlanetPoints.forEach(({ planet, point, angle, index }) => {
        const p = project(point, width, height)
        if (!p.visible) return
        const isSelected = selectedPlanetRef.current?.name === planet.name
        const radius = Math.max(5.5, planet.radius * p.scale * 1.15)

        if (isSelected) {
          drawGlowCircle(p.x, p.y, radius + 5, 'rgba(231,211,147,0.45)', 28)
        }

        if (planet.ring) {
          ctx.strokeStyle = 'rgba(231,211,147,0.32)'
          ctx.lineWidth = Math.max(4, 5 * p.scale)
          ctx.beginPath()
          ctx.ellipse(p.x, p.y, radius * 2.08, radius * 0.58, -0.35, 0, Math.PI * 2)
          ctx.stroke()
        }

        drawPlanetBody(planet, p.x, p.y, radius, state.time * (1.8 + index * 0.14))

        if (planet.ring) {
          ctx.strokeStyle = 'rgba(255,235,172,0.8)'
          ctx.lineWidth = Math.max(1.4, 2 * p.scale)
          ctx.beginPath()
          ctx.ellipse(p.x, p.y, radius * 1.95, radius * 0.52, -0.35, 0, Math.PI * 2)
          ctx.stroke()
        }

        if (planet.moon) {
          const moonAngle = state.time * 8 + angle
          const moonPoint = project({
            x: point.x + Math.cos(moonAngle) * 15,
            y: point.y + Math.sin(moonAngle) * 5,
            z: point.z + Math.sin(moonAngle) * 15,
          }, width, height)
          ctx.fillStyle = '#d7d7d7'
          ctx.beginPath()
          ctx.arc(moonPoint.x, moonPoint.y, Math.max(1.8, 2.4 * moonPoint.scale), 0, Math.PI * 2)
          ctx.fill()
        }

        drawLabel(planet.vi, p.x, p.y + radius + 16, isSelected)
        hits.push({ planet, x: p.x, y: p.y, radius: Math.max(22, radius + 10), z: p.z })
      })

      hitRef.current = hits.sort((a, b) => b.z - a.z)
      drawVignette(width, height)
      frameRef.current = requestAnimationFrame(draw)
    }

    const onPointerDown = (event) => {
      const state = stateRef.current
      state.dragging = true
      state.moved = false
      state.startX = event.clientX
      state.startY = event.clientY
      state.lastX = event.clientX
      state.lastY = event.clientY
      canvas.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event) => {
      const state = stateRef.current
      if (!state.dragging) return
      const dx = event.clientX - state.lastX
      const dy = event.clientY - state.lastY
      const totalDx = event.clientX - state.startX
      const totalDy = event.clientY - state.startY
      if (Math.hypot(totalDx, totalDy) > 5) state.moved = true
      state.lastX = event.clientX
      state.lastY = event.clientY
      state.yaw += dx * 0.006
      state.pitch = normalizeAngle(state.pitch + dy * 0.006)
    }

    const onPointerUp = (event) => {
      const state = stateRef.current
      const wasClick = !state.moved
      state.dragging = false

      if (!wasClick) return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const clickedPlanet = hitRef.current.find((hit) => Math.hypot(x - hit.x, y - hit.y) <= hit.radius)

      if (clickedPlanet) {
        setSelectedPlanet(clickedPlanet.planet)
        state.targetZoom = getPlanetZoom(clickedPlanet.planet)
      }
    }

    const onWheel = (event) => {
      event.preventDefault()
      const state = stateRef.current
      const hasTarget = Boolean(selectedPlanetRef.current)
      const nextZoom = state.targetZoom * (event.deltaY > 0 ? 0.84 : 1.18)
      state.targetZoom = Math.max(0.52, Math.min(hasTarget ? 12 : 4.8, nextZoom))
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerUp)
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [isPlaying, speed])

  const resetView = () => {
    stateRef.current.yaw = -0.45
    stateRef.current.pitch = 0.62
    stateRef.current.zoom = 1.05
    stateRef.current.targetZoom = 1.05
    stateRef.current.focus = { x: 0, y: 0, z: 0 }
    stateRef.current.targetFocus = { x: 0, y: 0, z: 0 }
    setSelectedPlanet(null)
  }

  const focusPlanet = (planet) => {
    stateRef.current.targetZoom = getPlanetZoom(planet)
    setSelectedPlanet(planet)
  }

  const toggleFullscreen = async () => {
    if (!stageRef.current) return

    if (!document.fullscreenElement) {
      await stageRef.current.requestFullscreen()
      return
    }

    await document.exitFullscreen()
  }

  return (
    <section id="solar-system" className="solar-system-section">
      <div className="solar-system-shell">
        <div className="solar-system-header">
          <span className="solar-system-badge">360° Space Lab</span>
          <h2>Quan sát hệ mặt trời</h2>
          <p>
            Kéo chuột để đổi góc nhìn, lăn chuột để phóng to hoặc thu nhỏ, rồi click trực tiếp vào hành tinh để xem thông tin.
          </p>
        </div>

        <div ref={stageRef} className="solar-system-stage">
          <canvas ref={canvasRef} aria-label="Mô phỏng hệ mặt trời 360 độ" />

          {selectedPlanet && (
            <div className="planet-detail-card">
              <button type="button" className="planet-detail-back" onClick={resetView} aria-label="Quay lại toàn cảnh">
                Quay lại
              </button>

              <div className="planet-detail-preview" style={{ '--planet-color': selectedPlanet.color }}>
                <div className={`planet-detail-sphere ${selectedPlanet.ring ? 'has-ring' : ''}`}>
                  {selectedPlanet.moon && <span className="planet-detail-moon" />}
                </div>
              </div>

              <div className="planet-detail-info">
                <span>Đang quan sát</span>
                <h3>{selectedPlanet.vi}</h3>
                <p>{selectedPlanet.note}</p>
                <ul>
                  <li><b>Đường kính:</b> {selectedPlanet.diameter}</li>
                  <li><b>Ngày:</b> {selectedPlanet.day}</li>
                  <li><b>Năm:</b> {selectedPlanet.year}</li>
                  <li><b>Khoảng cách TB:</b> {selectedPlanet.distance}</li>
                </ul>
              </div>
            </div>
          )}

          <div className="solar-system-controls">
            {/* HÀNG 1: Gom các nút chức năng thành icon tròn/vuông gọn gàng */}

            <div className="control-buttons-row">
              <button type="button" onClick={() => setIsPlaying((value) => !value)} title={isPlaying ? 'Tạm dừng' : 'Chạy tiếp'}>
                <span className="btn-icon">{isPlaying ? '⏸' : '▶'}</span>
                <span className="btn-text">{isPlaying ? 'Tạm dừng' : 'Chạy tiếp'}</span>
              </button>
              <button type="button" onClick={resetView} title="Đặt lại góc nhìn">
                <span className="btn-icon">↺</span>
                <span className="btn-text">Đặt lại góc nhìn</span>
              </button>

              <button type="button" onClick={toggleFullscreen} title="Toàn màn hình">
                <span className="btn-icon">{isFullscreen ? '⛶' : '🗖'}</span>
                <span className="btn-text">{isFullscreen ? 'Thoát màn hình' : 'Toàn màn hình'}</span>
              </button>

            </div>

            {/* HÀNG 2: Thanh chỉnh tốc độ mảnh mai */}
            <div className="speed-control-box">
              <label>
                {/* Bọc chữ "Tốc độ" vào span để dễ điều khiển bằng CSS */}
                <span className="speed-label-text">Tốc độ: </span>

                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={speed} /* Hoặc biến tốc độ hiện tại của cậu */
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                />

                {/* Con số hiển thị (Ví dụ: 1.0x) */}
                <span className="speed-value">{speed.toFixed(1)}x</span>
              </label>
            </div>
          </div>
        </div>

        <div className="planet-picker" aria-label="Chọn hành tinh">
          {planets.map((planet) => (
            <button
              key={planet.name}
              type="button"
              className={selectedPlanet?.name === planet.name ? 'active' : ''}
              onClick={() => focusPlanet(planet)}
            >
              <span style={{ backgroundColor: planet.color }} />
              {planet.vi}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolarSystem
