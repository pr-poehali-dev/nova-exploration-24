import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "В каких регионах вы работаете?",
    answer:
      "Студия базируется в Москве, но выполняем проекты по всей России. Выезд на замер и монтаж осуществляем в Московском регионе — другие города обсуждаем индивидуально.",
  },
  {
    question: "Сколько времени занимает изготовление и монтаж?",
    answer:
      "Сроки зависят от сложности конструкции. Офисные перегородки — от 2 недель, зимний сад или витраж — от 4 до 8 недель. Точные сроки обсуждаем после замера.",
  },
  {
    question: "Можно ли заказать нестандартные формы и цвета стекла?",
    answer:
      "Да, мы работаем с любыми формами: арки, скосы, фигурные вырезы. Цветное, матовое, тонированное, зеркальное и декоративное стекло — всё по вашему желанию.",
  },
  {
    question: "Вы работаете под ключ — и замер, и монтаж?",
    answer:
      "Да, полный цикл: выезд на замер, разработка проекта, изготовление конструкции и монтаж. Вам не нужно искать несколько подрядчиков — мы делаем всё сами.",
  },
  {
    question: "Есть ли гарантия на конструкции?",
    answer:
      "Даём гарантию на все работы и материалы. Стекло и профиль — от производителя, монтаж — от нашей студии. Если что-то пойдёт не так, приедем и исправим.",
  },
  {
    question: "Как начать сотрудничество?",
    answer:
      "Напишите или позвоните нам — обсудим задачу, назначим выезд на замер. Замер бесплатный. После него подготовим проект и смету в течение 2–3 рабочих дней.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}