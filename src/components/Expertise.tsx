import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const expertiseAreas = [
  {
    title: "Офисные перегородки",
    description: "Стеклянные перегородки для офисов: зонирование пространства без потери света и ощущения открытости. Системы раздвижных, распашных и неподвижных конструкций.",
    icon: "Building2",
  },
  {
    title: "Витражное остекление",
    description:
      "Создаём витражи по индивидуальным эскизам: цветное, текстурное, художественное стекло. Для входных групп, фасадов, интерьерных перегородок.",
    icon: "Sparkles",
  },
  {
    title: "Зимние сады",
    description:
      "Проектируем и монтируем зимние сады из стекла и алюминия. Тёплое остекление с энергосберегающими стеклопакетами для круглогодичного использования.",
    icon: "Leaf",
  },
  {
    title: "Беседки и террасы",
    description:
      "Стеклянные беседки и навесы для загородных домов и участков. Закалённое и ламинированное стекло, устойчивое к нагрузкам и перепадам температур.",
    icon: "Home",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Конструкции</HighlightedText>, которые
            <br />
            преображают
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Более 10 лет опыта в стеклянных конструкциях — от небольших перегородок до масштабных зимних садов и витражей под ключ.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon name={area.icon} size={40} className="mb-4 text-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}