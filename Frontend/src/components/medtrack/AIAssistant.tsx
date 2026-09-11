import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Bot,
  Sparkles,
  X,
  Send,
  AlertCircle,
  Pill,
  Clock,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  patient,
  nextDose,
  overview,
  todaySchedule,
  initialMedicationsList,
  interactionWarnings,
  upcomingAppointmentsList,
} from "@/lib/mock-data";

type Message = {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  isQuickOption?: boolean;
};

const INITIAL_GREETING: Message = {
  id: "msg-init",
  sender: "assistant",
  text: `Hi! I'm MedTrack AI 👋\nI can help you understand your medication schedule, adherence, reminders, and general medication information.`,
  timestamp: "Just now",
};

const SUGGESTIONS = [
  "What's my next dose?",
  "How is my adherence?",
  "Show today's medications",
  "What is this medication for?",
];

// Helper to generate context-aware responses based on MedTrack dashboard data
function getAssistantResponse(rawInput: string): string {
  const query = rawInput.trim().toLowerCase();

  // 1. Critical Medical Emergency Guardrails
  const emergencyKeywords = [
    "chest pain",
    "heart attack",
    "can't breathe",
    "cannot breathe",
    "shortness of breath",
    "overdose",
    "swallowed too many",
    "severe allergic",
    "anaphylaxis",
    "unconscious",
    "emergency",
    "bleeding heavily",
    "stroke",
  ];
  if (emergencyKeywords.some((k) => query.includes(k))) {
    return "⚠️ If this may be a medical emergency, please call your local emergency services (like 911 or 112) immediately or go to the nearest emergency room. Do not wait for online responses.";
  }

  // 2. Out-of-scope diagnosis & prescription alteration Guardrails
  const outOfScopeKeywords = [
    "diagnose",
    "what illness do i have",
    "what disease do i have",
    "should i stop taking",
    "can i stop taking",
    "stop taking",
    "change my dose",
    "increase my dose",
    "double my dose",
    "decrease my dose",
    "prescribe",
    "cure my",
  ];
  if (outOfScopeKeywords.some((k) => query.includes(k))) {
    return "I can provide general medication information and help you track your schedule, but I cannot diagnose medical conditions or recommend changing your prescribed treatment. Please consult your prescribing doctor or pharmacist for personalized medical advice.";
  }

  // 3. Next Dose Queries
  if (
    query.includes("next dose") ||
    query.includes("next medicine") ||
    query.includes("what's next") ||
    query.includes("upcoming dose")
  ) {
    const upcomingDose = nextDose;
    return `Your next scheduled medication is **${upcomingDose.medicine} ${upcomingDose.dosage}** at **${upcomingDose.time}** (${upcomingDose.timeRemaining}).\n\n📌 **Instruction:** ${upcomingDose.instruction}`;
  }

  // 4. Adherence & Streak Queries
  if (
    query.includes("adherence") ||
    query.includes("streak") ||
    query.includes("score") ||
    query.includes("how am i doing") ||
    query.includes("compliance")
  ) {
    return `Your current adherence score is **${overview.adherencePercent}%**.\n\nYou've logged **${overview.dosesCompletedToday} of ${overview.dosesScheduledToday}** scheduled doses today, with an active streak of **${overview.streakDays} days**! 🔥\n\nKeep it up to stay on top of your treatment plan.`;
  }

  // 5. Today's Medications / Schedule
  if (
    query.includes("today's medication") ||
    query.includes("today's schedule") ||
    query.includes("show today") ||
    query.includes("medications today") ||
    query.includes("what medicines today") ||
    query.includes("schedule today")
  ) {
    const dosesList = todaySchedule
      .map((d) => `• **${d.time}**: ${d.medicine} (${d.dosage}) — *Status: ${d.status}*`)
      .join("\n");

    return `Here is your scheduled medication overview for today:\n\n${dosesList}\n\nPlease check your medication cards on the dashboard for detailed instructions and logging.`;
  }

  // 6. Medication Indications & "What is this medication for?"
  if (
    query.includes("what is this medication for") ||
    query.includes("what is it for") ||
    query.includes("why am i taking") ||
    query.includes("conditions") ||
    query.includes("purpose")
  ) {
    const activeMeds = initialMedicationsList.filter((m) => m.status !== "completed");
    const formatted = activeMeds
      .map((m) => `• **${m.name} (${m.dosage})**: Prescribed for *${m.condition}*. (${m.timing})`)
      .join("\n");

    return `Here is what your active medications are prescribed for:\n\n${formatted}\n\nAlways consult your doctor or pharmacist before making any changes to your medication routine.`;
  }

  // 7. Specific Medication Queries
  if (query.includes("metformin")) {
    const met = initialMedicationsList.find((m) => m.name.toLowerCase() === "metformin");
    return `**Metformin (${met?.dosage || "500 mg"})** is used for **Type 2 Diabetes**.\n• **Timing:** ${met?.timing || "Twice daily after meals"}\n• **Instructions:** ${met?.instructions || "Take with food to reduce stomach upset."}\n• **Refill:** ${met?.refillInfo.daysLeft || 12} days left (${met?.refillInfo.pillsRemaining || 24} pills).`;
  }

  if (query.includes("amlodipine")) {
    const amlo = initialMedicationsList.find((m) => m.name.toLowerCase() === "amlodipine");
    return `**Amlodipine (${amlo?.dosage || "5 mg"})** is prescribed for **Hypertension / High Blood Pressure**.\n• **Timing:** ${amlo?.timing || "Morning with water"}\n• **Instructions:** ${amlo?.instructions || "Take around the same time daily. Avoid grapefruit juice."}\n• **Refill Status:** ${amlo?.refillInfo.daysLeft || 4} days left (${amlo?.refillInfo.pillsRemaining || 4} pills).`;
  }

  if (query.includes("atorvastatin")) {
    const ator = initialMedicationsList.find((m) => m.name.toLowerCase() === "atorvastatin");
    return `**Atorvastatin (${ator?.dosage || "10 mg"})** is prescribed for **High Cholesterol**.\n• **Timing:** ${ator?.timing || "Night at bedtime"}\n• **Instructions:** ${ator?.instructions || "Take at bedtime with or without food."}\n• **Refill Alert:** Refill is due soon (${ator?.refillInfo.daysLeft || 2} days left).`;
  }

  if (query.includes("vitamin d") || query.includes("vitamin d3")) {
    const vit = initialMedicationsList.find((m) => m.name.toLowerCase().includes("vitamin d"));
    return `**Vitamin D3 (${vit?.dosage || "60,000 IU"})** is prescribed for **Vitamin D Deficiency**.\n• **Frequency:** Once weekly (Wednesday with lunch)\n• **Instructions:** Take with a meal containing healthy fats for optimal absorption.`;
  }

  // 8. Refill Inquiries
  if (query.includes("refill") || query.includes("pills left") || query.includes("running out")) {
    const refillMeds = initialMedicationsList.filter(
      (m) => m.status === "refill_due" || m.refillInfo.daysLeft <= 7,
    );
    if (refillMeds.length > 0) {
      const list = refillMeds
        .map((m) => `• **${m.name}**: ${m.refillInfo.pillsRemaining} pills remaining (~${m.refillInfo.daysLeft} days)`)
        .join("\n");
      return `You have medication refills to plan for:\n\n${list}\n\nConsider requesting a prescription renewal from your healthcare provider or pharmacy soon.`;
    }
    return `All your current medications have sufficient supply. Atorvastatin has the closest refill in 2 days.`;
  }

  // 9. Interaction Inquiries
  if (query.includes("interaction") || query.includes("safety") || query.includes("warning")) {
    const warn = interactionWarnings[0];
    if (warn) {
      return `⚠️ **Interaction Notice:**\nMedTrack detected a moderate interaction between **${warn.medicines.join(" and ")}**.\n\n*${warn.summary}*\n\nPlease consult your doctor or pharmacist if you experience any unusual symptoms.`;
    }
    return `No high-risk drug interactions currently detected among your active medications.`;
  }

  // 10. Missed Dose Guidelines
  if (query.includes("missed dose") || query.includes("forgot to take") || query.includes("late dose")) {
    return `If you miss a dose:\n1. Take it as soon as you remember unless it is almost time for your next scheduled dose.\n2. **Never take a double dose** to make up for a missed one.\n3. Refer to the specific instructions on your prescription label or check with your pharmacist.`;
  }

  // 11. Appointments
  if (query.includes("appointment") || query.includes("doctor") || query.includes("visit")) {
    const nextApt = upcomingAppointmentsList[0];
    if (nextApt) {
      return `Your next scheduled appointment:\n• **${nextApt.doctorName}** (${nextApt.specialty})\n• **Date & Time:** ${nextApt.dateDisplay} at ${nextApt.time}\n• **Type:** ${nextApt.type} (${nextApt.mode})\n• **Location:** ${nextApt.location}`;
    }
    return `You have no immediate appointments scheduled today.`;
  }

  // 12. Friendly General Fallback with Context
  return `I can help you with your medication schedule, next doses, adherence score, and prescription instructions.

You can ask questions like:
• *"What's my next dose?"*
• *"How is my adherence this week?"*
• *"When should I take Metformin?"*
• *"Do I have any refills due?"*

For medical diagnoses or adjusting your treatment plan, please consult Dr. Sharma or your primary doctor.`;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when opened on desktop
      const timer = setTimeout(() => {
        if (window.innerWidth >= 640) {
          inputRef.current?.focus();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate realistic AI reasoning & retrieval delay
    setTimeout(() => {
      const responseText = getAssistantResponse(trimmed);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setIsTyping(false);
  };

  return (
    <>
      {/* ──────────────── 1. COMPACT CHAT PANEL OVERLAY ──────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="MedTrack AI Assistant"
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden",
            "bottom-[78px] right-4 sm:bottom-20 sm:right-6",
            "w-[calc(100vw-2rem)] sm:w-[380px] md:w-[390px]",
            "h-[510px] max-h-[calc(100vh-100px)] sm:max-h-[580px]",
            "rounded-2xl sm:rounded-3xl border border-border bg-card",
            "shadow-[0_16px_36px_-6px_oklch(0.24_0.028_240/0.18),0_4px_12px_-2px_oklch(0.24_0.028_240/0.08)]",
            "animate-in fade-in zoom-in-95 duration-200",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-xs"
              >
                <Sparkles className="size-4.5" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-foreground">
                    MedTrack AI
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-1.5 py-0.2 text-[10px] font-semibold text-success">
                    <span className="size-1.5 rounded-full bg-success animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  Your medication support assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetChat}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-muted"
              >
                <RotateCcw className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                title="Close AI Assistant"
                aria-label="Close AI Assistant"
                className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-muted"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-background/50">
            {messages.map((msg) => {
              const isAssistant = msg.sender === "assistant";
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col gap-1 text-sm max-w-[88%]",
                    isAssistant ? "items-start self-start" : "items-end self-end ml-auto",
                  )}
                >
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {isAssistant ? "MedTrack AI" : patient.firstName}
                    </span>
                    <span className="text-[10px] text-muted-foreground/70">{msg.timestamp}</span>
                  </div>

                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs sm:text-[13px] shadow-xs",
                      isAssistant
                        ? "bg-card text-card-foreground border border-border rounded-tl-sm whitespace-pre-line"
                        : "bg-primary text-primary-foreground rounded-tr-sm",
                    )}
                  >
                    {/* Render markdown bolding/bullets cleanly */}
                    <FormattedMessage content={msg.text} isAssistant={isAssistant} />
                  </div>

                  {/* Initial greeting quick chips rendered once right below greeting */}
                  {msg.id === "msg-init" && messages.length === 1 && (
                    <div className="pt-2 w-full space-y-1.5">
                      <p className="text-[11px] font-medium text-muted-foreground px-1">
                        Quick suggestions:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {SUGGESTIONS.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="rounded-xl border border-border bg-card px-2.5 py-1.5 text-left text-xs font-medium text-foreground shadow-2xs transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary active:scale-98"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex flex-col gap-1 items-start text-sm self-start">
                <span className="text-[10px] font-medium text-muted-foreground px-1">
                  MedTrack AI
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-xs text-muted-foreground shadow-xs">
                  <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1.5 rounded-full bg-primary animate-bounce" />
                  <span className="ml-1 text-[11px]">Thinking…</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input & Disclaimer Footer */}
          <div className="border-t border-border bg-surface p-3 sm:p-3.5 space-y-2">
            <form onSubmit={handleFormSubmit} className="relative flex items-center gap-1.5">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about doses, schedules, adherence..."
                disabled={isTyping}
                className={cn(
                  "w-full rounded-xl border border-input bg-card py-2.5 pl-3.5 pr-10 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70",
                  "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                  "transition-all",
                )}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="absolute right-1.5 size-7 rounded-lg bg-primary text-primary-foreground hover:bg-primary-strong disabled:opacity-40 transition-colors"
              >
                <Send className="size-3.5" />
              </Button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-muted-foreground/80 px-1">
              <span className="truncate">Informational support · Not medical advice</span>
              <span className="shrink-0 font-medium">MedTrack v1.0</span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 2. FLOATING AI ASSISTANT BUTTON ──────────────── */}
      <div className="fixed bottom-[74px] right-3.5 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AI Assistant" : "Open MedTrack AI Assistant"}
          className={cn(
            "group relative flex items-center gap-2 rounded-full p-2.5 sm:px-4 sm:py-2.5",
            "bg-primary text-primary-foreground font-semibold text-xs sm:text-sm tracking-tight",
            "shadow-[0_8px_20px_oklch(0.52_0.09_195/0.32)] hover:shadow-[0_12px_28px_oklch(0.52_0.09_195/0.45)]",
            "transition-all duration-200 ease-out hover:bg-primary-strong active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          )}
        >
          {isOpen ? (
            <>
              <ChevronDown className="size-5 transition-transform group-hover:translate-y-0.5" />
              <span className="hidden sm:inline font-medium">Close Assistant</span>
            </>
          ) : (
            <>
              <span className="relative flex size-5 items-center justify-center">
                <Sparkles className="size-4.5 transition-transform group-hover:scale-110" />
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-warning ring-2 ring-primary" />
              </span>
              <span className="hidden sm:inline font-bold">AI Assistant</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

/**
 * Simple formatted message renderer that converts markdown bold and lists cleanly without heavy external markdown parser
 */
function FormattedMessage({ content, isAssistant }: { content: string; isAssistant: boolean }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, idx) => {
        if (!line.trim()) {
          return <div key={idx} className="h-1" />;
        }

        // Parse bold **text**
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <p key={idx} className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                const boldText = part.slice(2, -2);
                return (
                  <strong
                    key={pIdx}
                    className={isAssistant ? "font-bold text-foreground" : "font-bold text-white"}
                  >
                    {boldText}
                  </strong>
                );
              }
              if (part.startsWith("*") && part.endsWith("*")) {
                const italicText = part.slice(1, -1);
                return (
                  <em key={pIdx} className="italic text-muted-foreground">
                    {italicText}
                  </em>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}
