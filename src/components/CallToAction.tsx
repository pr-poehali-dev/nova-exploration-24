import { useState } from "react"
import { ArrowRight, Loader2, CheckCircle } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const SEND_ORDER_URL = "https://functions.poehali.dev/13755662-1062-423e-9866-b250a05dc8e5"

export function CallToAction() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment }),
      })
      if (res.ok) {
        setSuccess(true)
        setName("")
        setPhone("")
        setComment("")
      } else {
        const data = await res.json()
        setError(data.error || "Что-то пошло не так, попробуйте ещё раз")
      }
    } catch {
      setError("Ошибка отправки, проверьте подключение к интернету")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Начать проект</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Хотите стекло
            <br />в своём <HighlightedText>пространстве</HighlightedText>?
          </h2>

          <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Оставьте заявку — приедем на бесплатный замер и подготовим расчёт стоимости.
          </p>

          {success ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-12 h-12 text-orange-200" strokeWidth={1.5} />
              <p className="text-xl font-medium">Заявка отправлена!</p>
              <p className="text-primary-foreground/60">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm outline-none focus:border-white/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm outline-none focus:border-white/50 transition-colors"
                />
              </div>
              <textarea
                placeholder="Расскажите о задаче (тип конструкции, размеры, пожелания)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm outline-none focus:border-white/50 transition-colors resize-none"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Отправить заявку
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-primary-foreground/40 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t border-white/10">
            <a href="tel:+79231072101" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm">
              +7 (923) 107-21-01
            </a>
            <span className="hidden sm:block text-primary-foreground/20">·</span>
            <a href="mailto:89231072101@mail.ru" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm">
              89231072101@mail.ru
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
