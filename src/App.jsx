import { useState, useCallback, useEffect, useMemo } from "react";

const MEALS = {
  breakfasts: [
    {
      id: "b1",
      name: "Spiced Veggie Omelette",
      time: "8 mins",
      cal: 460,
      protein: 28,
      icon: "🍳",
      ingredients: [
        "2 large eggs + 1 tbsp milk",
        "Handful of spinach",
        "30g feta or cheddar",
        "½ small tomato, chopped",
        "Pinch of cumin and chilli flakes",
        "1 slice sourdough (40g)",
      ],
      method:
        "Fry the tomato and spinach for a minute, pour in eggs, add cheese, fold when almost set. Toast the bread.",
    },
    {
      id: "b2",
      name: "Greek Yoghurt Power Bowl",
      time: "5 mins",
      cal: 500,
      protein: 30,
      icon: "🫐",
      ingredients: [
        "200g Greek yoghurt (full fat)",
        "30g granola",
        "1 tbsp peanut butter (15g)",
        "100g mixed berries",
        "1 tsp honey",
      ],
      method: "Assemble. Done.",
    },
    {
      id: "b3",
      name: "Smoked Salmon & Egg Bagel",
      time: "8 mins",
      cal: 450,
      protein: 32,
      icon: "🥯",
      ingredients: [
        "1 bagel thin or small bagel (55g)",
        "60g smoked salmon",
        "1 large egg, fried or scrambled",
        "Handful of rocket",
        "Squeeze of lemon, black pepper",
      ],
      method:
        "Toast bagel. Fry or scramble the egg. Layer salmon, egg, and rocket. Season with lemon and pepper.",
    },
    {
      id: "b4",
      name: "Spiced Chickpea & Egg Toast",
      time: "10 mins",
      cal: 480,
      protein: 28,
      icon: "🥚",
      ingredients: [
        "½ tin chickpeas (120g drained), roughly mashed",
        "1 large egg, fried",
        "1 slice sourdough (40g)",
        "1 tsp cumin, squeeze of lemon, pinch of chilli",
        "Handful of spinach",
      ],
      method:
        "Warm chickpeas in a pan with spices and lemon. Pile onto toast with spinach and egg on top.",
    },
    {
      id: "b5",
      name: "Overnight Protein Oats",
      time: "3 mins (prep night before)",
      cal: 520,
      protein: 35,
      icon: "🥣",
      ingredients: [
        "50g oats",
        "150ml milk",
        "30g protein powder (vanilla or chocolate)",
        "1 tbsp chia seeds",
        "80g frozen mango or berries",
      ],
      method:
        "Mix oats, milk, protein powder, and chia in a jar. Top with frozen fruit. Refrigerate overnight.",
    },
  ],
  lunches: [
    {
      id: "l1",
      name: "Big Grain Bowl",
      time: "15 mins (or prepped)",
      cal: 620,
      protein: 28,
      icon: "🥗",
      tags: ["🏢", "🏠"],
      ingredients: [
        "150g cooked quinoa or bulgur wheat",
        "100g canned black beans (drained)",
        "80g roasted sweet potato",
        "50g feta",
        "Handful of rocket or spinach",
        "Dressing: 1 tbsp olive oil, lime juice, pinch of cumin",
      ],
      method:
        "Assemble bowl with grains, beans, sweet potato, and greens. Crumble feta on top. Drizzle dressing.",
    },
    {
      id: "l2",
      name: "Tuna Niçoise-ish Salad",
      time: "10 mins",
      cal: 580,
      protein: 42,
      icon: "🐟",
      tags: ["🏢", "🏠"],
      ingredients: [
        "1 tin tuna in spring water (120g drained)",
        "2 boiled eggs",
        "100g new potatoes (boiled, halved)",
        "Handful green beans",
        "6 cherry tomatoes",
        "6 olives",
        "Dressing: 1 tsp olive oil, 1 tsp Dijon mustard, red wine vinegar",
      ],
      method:
        "Arrange everything on a plate or in a container. Whisk dressing ingredients and drizzle over.",
    },
    {
      id: "l3",
      name: "Halloumi & Lentil Wrap",
      time: "10 mins",
      cal: 640,
      protein: 35,
      icon: "🧀",
      tags: ["🏠"],
      ingredients: [
        "80g halloumi, sliced and grilled",
        "100g pre-cooked puy lentils (pouch)",
        "1 large tortilla wrap",
        "Handful of rocket",
        "2 tbsp hummus",
        "Squeeze of lemon",
      ],
      method:
        "Grill halloumi slices 2 mins each side. Warm lentils. Spread hummus on wrap, add everything, roll up.",
    },
    {
      id: "l4",
      name: "Miso Tofu Noodle Pot",
      time: "15 mins",
      cal: 520,
      protein: 32,
      icon: "🍜",
      tags: ["🏢"],
      ingredients: [
        "100g firm tofu, cubed and pan-fried with soy sauce",
        "1 nest dried egg noodles (60g)",
        "1 tbsp white miso paste",
        "60g edamame beans (frozen, defrosted)",
        "Spring onions, chilli flakes",
        "300ml boiling water",
      ],
      method:
        "For office: pack tofu, noodles, miso, and edamame separately. Add boiling water at lunch. At home: fry tofu, cook noodles, dissolve miso in hot water, combine.",
    },
    {
      id: "l5",
      name: "Loaded Bean Soup + Bread",
      time: "5 mins (batch cooked)",
      cal: 550,
      protein: 26,
      icon: "🍲",
      tags: ["🏢", "🏠"],
      ingredients: [
        "400g tin mixed beans",
        "400g tin chopped tomatoes",
        "1 onion, 2 cloves garlic",
        "1 tsp smoked paprika, 1 tsp cumin",
        "100ml veg stock",
        "1 slice sourdough (40g)",
      ],
      method:
        "Batch cook: soften onion and garlic, add spices, tomatoes, beans, and stock. Simmer 15 mins. Makes 3–4 portions. Reheat and serve with toast.",
    },
  ],
  dinners: [
    {
      id: "d1",
      name: "Teriyaki Salmon Stir-Fry",
      time: "12 mins",
      cal: 580,
      protein: 38,
      icon: "🍣",
      doubles: false,
      ingredients: [
        "1 salmon fillet (130g)",
        "150g pre-prepared stir-fry vegetables (bagged)",
        "100g pre-cooked rice (microwave pouch)",
        "Teriyaki: 1 tbsp soy sauce, 1 tsp honey, 1 tsp rice vinegar, grated ginger",
      ],
      method:
        "Pan-fry salmon 4 mins each side. Stir-fry veg 3 mins. Heat rice. Drizzle teriyaki.",
    },
    {
      id: "d2",
      name: "Black Bean Tacos",
      time: "10 mins",
      cal: 560,
      protein: 24,
      icon: "🌮",
      doubles: true,
      ingredients: [
        "200g canned black beans (drained)",
        "2 small corn tortillas",
        "40g cheddar, grated",
        "½ avocado (60g)",
        "Salsa, lime, coriander",
        "1 tsp cumin, 1 tsp smoked paprika",
      ],
      method:
        "Heat beans with spices. Warm tortillas. Load up. Add a fried egg on top for extra protein.",
    },
    {
      id: "d3",
      name: "Pesto Pasta with White Beans",
      time: "12 mins",
      cal: 580,
      protein: 28,
      icon: "🍝",
      doubles: true,
      ingredients: [
        "80g dried pasta (penne or fusilli)",
        "100g canned cannellini beans (drained)",
        "1 tbsp green pesto",
        "Large handful of spinach",
        "20g parmesan, grated",
        "Cherry tomatoes (optional)",
      ],
      method:
        "Boil pasta. In last 2 mins add beans and spinach to the water. Drain. Stir through pesto and parmesan.",
    },
    {
      id: "d4",
      name: "Smoked Mackerel & Potato Hash",
      time: "12 mins",
      cal: 560,
      protein: 36,
      icon: "🐟",
      doubles: true,
      ingredients: [
        "100g smoked mackerel, flaked",
        "200g new potatoes (pre-cooked or tinned), halved",
        "Handful of spinach or kale",
        "1 egg, fried",
        "1 tsp olive oil",
      ],
      method:
        "Fry potatoes in oil until crispy (5–6 mins). Add mackerel and greens. Top with fried egg.",
    },
    {
      id: "d5",
      name: "Tofu Pad Thai",
      time: "15 mins",
      cal: 530,
      protein: 30,
      icon: "🥡",
      doubles: false,
      ingredients: [
        "100g firm tofu, cubed",
        "1 nest rice noodles (60g)",
        "1 egg, scrambled into the pan",
        "60g beansprouts",
        "Spring onions, crushed peanuts (10g)",
        "Sauce: 1 tbsp soy sauce, 1 tbsp sweet chilli, juice of ½ lime",
      ],
      method:
        "Fry tofu until golden. Soak noodles. Combine everything in the pan. Toss with sauce.",
    },
    {
      id: "d6",
      name: "Egg & Vegetable Fried Rice",
      time: "10 mins",
      cal: 560,
      protein: 28,
      icon: "🍚",
      doubles: true,
      ingredients: [
        "1 microwave rice pouch (250g)",
        "2 large eggs, scrambled into the rice",
        "100g frozen peas and sweetcorn",
        "60g edamame",
        "2 tbsp soy sauce, 1 tsp sesame oil",
        "Spring onions",
      ],
      method:
        "Heat oil, scramble eggs, add rice and frozen veg, stir-fry 4–5 mins. Season with soy and sesame oil.",
    },
    {
      id: "d7",
      name: "Cheesy Bean Quesadilla",
      time: "8 mins",
      cal: 600,
      protein: 26,
      icon: "🫔",
      doubles: true,
      ingredients: [
        "2 tortilla wraps",
        "150g canned kidney beans, roughly mashed",
        "50g cheddar, grated",
        "½ avocado",
        "Hot sauce, salsa",
      ],
      method:
        "Fill tortilla with beans and cheese. Dry-fry 2–3 mins each side until crispy and cheese melts. Serve with avocado and salsa.",
    },
  ],
  snacks: [
    { id: "s1", name: "Apple + peanut butter", detail: "1 apple + 20g PB", cal: 200, protein: 6, icon: "🍎" },
    { id: "s2", name: "Mixed nuts + fruit", detail: "30g nuts + 1 piece fruit", cal: 230, protein: 6, icon: "🥜" },
    { id: "s3", name: "Rice cakes + cream cheese", detail: "2 rice cakes + 30g cream cheese + cucumber", cal: 160, protein: 4, icon: "🍘" },
    { id: "s4", name: "Protein shake", detail: "30g powder + 200ml milk", cal: 220, protein: 28, icon: "🥤" },
    { id: "s5", name: "Greek yoghurt + honey", detail: "150g yoghurt + 10g honey", cal: 180, protein: 15, icon: "🍯" },
  ],
};

const DEFAULT_WEEK = {
  Mon: { breakfast: "b2", lunch: "l4", dinner: "d1", snack: "s1" },
  Tue: { breakfast: "b3", lunch: "l2", dinner: "d6", snack: "s4" },
  Wed: { breakfast: "b1", lunch: "l3", dinner: "d5", snack: "s2" },
  Thu: { breakfast: "b4", lunch: "l5", dinner: "d2", snack: "s5" },
  Fri: { breakfast: "b5", lunch: "l1", dinner: "d7", snack: "s3" },
  Sat: { breakfast: "b1", lunch: "l2", dinner: "d3", snack: "s1" },
  Sun: { breakfast: "b2", lunch: "l1", dinner: "d4", snack: "s2" },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOT_LABELS = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack" };
const SLOT_COLORS = {
  breakfast: { bg: "#FFF8F0", border: "#E8C9A0", accent: "#C47D2B", tag: "#FDF0E0" },
  lunch: { bg: "#F0F7F0", border: "#A8CDA8", accent: "#3D7A3D", tag: "#E4F2E4" },
  dinner: { bg: "#F0F0F8", border: "#A8A8CD", accent: "#4A4A8A", tag: "#E4E4F2" },
  snack: { bg: "#FFF5F5", border: "#DDAAAA", accent: "#A05050", tag: "#FCE8E8" },
};

const LS_WEEK_KEY = "mealplan-week";
const LS_CHECKED_KEY = "mealplan-checked";
const LS_SHOPPING_CHECKED_KEY = "mealplan-shopping-checked";

function getMeal(id) {
  const all = [...MEALS.breakfasts, ...MEALS.lunches, ...MEALS.dinners, ...MEALS.snacks];
  return all.find((m) => m.id === id);
}

function getOptions(slot) {
  if (slot === "breakfast") return MEALS.breakfasts;
  if (slot === "lunch") return MEALS.lunches;
  if (slot === "dinner") return MEALS.dinners;
  return MEALS.snacks;
}

function generateShoppingList(week) {
  const items = [];
  DAYS.forEach((day) => {
    const dayPlan = week[day];
    Object.keys(SLOT_LABELS).forEach((slot) => {
      const meal = getMeal(dayPlan[slot]);
      if (!meal) return;
      if (meal.ingredients) {
        meal.ingredients.forEach((ing) => {
          items.push({ ingredient: ing, mealName: meal.name, mealIcon: meal.icon });
        });
      } else if (meal.detail) {
        items.push({ ingredient: meal.detail, mealName: meal.name, mealIcon: meal.icon });
      }
    });
  });

  const grouped = new Map();
  items.forEach(({ ingredient, mealName, mealIcon }) => {
    const key = ingredient.toLowerCase().trim();
    if (!grouped.has(key)) {
      grouped.set(key, { ingredient, meals: new Set(), count: 0 });
    }
    const entry = grouped.get(key);
    entry.meals.add(`${mealIcon} ${mealName}`);
    entry.count += 1;
  });

  return Array.from(grouped.values())
    .map((entry) => ({
      ingredient: entry.ingredient,
      meals: Array.from(entry.meals),
      count: entry.count,
      key: entry.ingredient.toLowerCase().trim(),
    }))
    .sort((a, b) => b.count - a.count);
}

function getTodayDay() {
  const d = new Date().getDay();
  return DAYS[d === 0 ? 6 : d - 1];
}

export default function App() {
  const [week, setWeek] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_WEEK_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const isValid = DAYS.every(
          (d) => parsed[d] && parsed[d].breakfast && parsed[d].lunch && parsed[d].dinner && parsed[d].snack
        );
        if (isValid) return parsed;
      }
    } catch {}
    return DEFAULT_WEEK;
  });
  const [checked, setChecked] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_CHECKED_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return {};
  });
  const [selectedDay, setSelectedDay] = useState(getTodayDay());
  const [openRecipe, setOpenRecipe] = useState(null);
  const [swapping, setSwapping] = useState(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [shoppingChecked, setShoppingChecked] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_SHOPPING_CHECKED_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return {};
  });

  useEffect(() => {
    localStorage.setItem(LS_WEEK_KEY, JSON.stringify(week));
  }, [week]);

  useEffect(() => {
    localStorage.setItem(LS_CHECKED_KEY, JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    localStorage.setItem(LS_SHOPPING_CHECKED_KEY, JSON.stringify(shoppingChecked));
  }, [shoppingChecked]);

  const today = getTodayDay();

  const toggleCheck = useCallback((day, slot) => {
    const key = `${day}-${slot}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleSwap = useCallback((day, slot, newId) => {
    setWeek((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: newId },
    }));
    setSwapping(null);
  }, []);

  const shoppingList = useMemo(() => generateShoppingList(week), [week]);

  const toggleShoppingItem = useCallback((key) => {
    setShoppingChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const clearShoppingChecks = useCallback(() => {
    setShoppingChecked({});
  }, []);

  const dayPlan = week[selectedDay];
  const dayCalories = ["breakfast", "lunch", "dinner", "snack"].reduce((sum, slot) => {
    const m = getMeal(dayPlan[slot]);
    return sum + (m?.cal || 0);
  }, 0);
  const dayProtein = ["breakfast", "lunch", "dinner", "snack"].reduce((sum, slot) => {
    const m = getMeal(dayPlan[slot]);
    return sum + (m?.protein || 0);
  }, 0);

  // Recipe detail modal
  if (openRecipe) {
    const meal = getMeal(openRecipe);
    const slot = MEALS.breakfasts.find(m => m.id === openRecipe) ? "breakfast"
      : MEALS.lunches.find(m => m.id === openRecipe) ? "lunch"
      : MEALS.dinners.find(m => m.id === openRecipe) ? "dinner" : "snack";
    const colors = SLOT_COLORS[slot];

    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px" }}>
          <button
            onClick={() => setOpenRecipe(null)}
            style={{
              position: "sticky", top: 0, zIndex: 10, background: "#FAFAF7",
              width: "100%", padding: "16px 0 8px", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#666",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 18 }}>←</span> Back to {selectedDay}
          </button>

          <div style={{ padding: "8px 0 32px" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{meal.icon}</div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, margin: "0 0 4px", color: "#1a1a1a" }}>
              {meal.name}
            </h1>
            <div style={{ display: "flex", gap: 12, fontSize: 14, color: "#777", marginBottom: 20 }}>
              <span>⏱ {meal.time}</span>
              <span style={{ background: colors.tag, color: colors.accent, padding: "2px 10px", borderRadius: 20, fontWeight: 600 }}>
                {meal.cal} cal
              </span>
              <span style={{ background: colors.tag, color: colors.accent, padding: "2px 10px", borderRadius: 20, fontWeight: 600 }}>
                {meal.protein}g protein
              </span>
            </div>

            {meal.tags && (
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {meal.tags.map((t) => (
                  <span key={t} style={{ fontSize: 12, background: "#f0f0f0", padding: "3px 10px", borderRadius: 12, color: "#555" }}>
                    {t === "🏢" ? "🏢 Office" : "🏠 Home"}
                  </span>
                ))}
              </div>
            )}

            {meal.doubles !== undefined && (
              <div style={{
                fontSize: 13, padding: "8px 14px", borderRadius: 10, marginBottom: 20,
                background: meal.doubles ? "#E8F5E9" : "#FFF3E0",
                color: meal.doubles ? "#2E7D32" : "#E65100",
              }}>
                {meal.doubles ? "✓ Doubles well — cook once, eat two nights" : "Best cooked fresh each time"}
              </div>
            )}

            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, margin: "0 0 12px", color: "#1a1a1a" }}>
              Ingredients
            </h2>
            <div style={{
              background: "white", borderRadius: 14, padding: "4px 0",
              border: `1px solid ${colors.border}`, marginBottom: 24,
            }}>
              {meal.ingredients.map((ing, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    borderBottom: i < meal.ingredients.length - 1 ? "1px solid #f0f0f0" : "none",
                    fontSize: 15, color: "#333", lineHeight: 1.4,
                  }}
                >
                  {ing}
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, margin: "0 0 12px", color: "#1a1a1a" }}>
              Method
            </h2>
            <div style={{
              background: "white", borderRadius: 14, padding: "16px",
              border: `1px solid ${colors.border}`, fontSize: 15, lineHeight: 1.6, color: "#333",
            }}>
              {meal.method}
            </div>

            {meal.id.startsWith("s") && meal.detail && (
              <>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, margin: "24px 0 12px", color: "#1a1a1a" }}>
                  What's in it
                </h2>
                <div style={{
                  background: "white", borderRadius: 14, padding: "16px",
                  border: `1px solid ${colors.border}`, fontSize: 15, color: "#333",
                }}>
                  {meal.detail}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Swap picker modal
  if (swapping) {
    const { day, slot } = swapping;
    const options = getOptions(slot);
    const colors = SLOT_COLORS[slot];
    const current = week[day][slot];

    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px" }}>
          <button
            onClick={() => setSwapping(null)}
            style={{
              position: "sticky", top: 0, zIndex: 10, background: "#FAFAF7",
              width: "100%", padding: "16px 0 8px", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#666",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 18 }}>←</span> Back
          </button>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, margin: "8px 0 20px", color: "#1a1a1a" }}>
            Swap {SLOT_LABELS[slot]} — {day}
          </h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 32 }}>
            {options.map((meal) => (
              <button
                key={meal.id}
                onClick={() => handleSwap(day, slot, meal.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 16px", borderRadius: 14,
                  background: meal.id === current ? colors.tag : "white",
                  border: `1.5px solid ${meal.id === current ? colors.accent : "#e0e0e0"}`,
                  cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>{meal.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: "#1a1a1a", marginBottom: 2 }}>
                    {meal.name} {meal.id === current && "✓"}
                  </div>
                  <div style={{ fontSize: 13, color: "#888" }}>
                    {meal.cal} cal · {meal.protein}g protein
                    {meal.time && ` · ${meal.time}`}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Shopping list view
  if (showShoppingList) {
    const checkedCount = shoppingList.filter((item) => shoppingChecked[item.key]).length;

    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 32px" }}>
          <button
            onClick={() => setShowShoppingList(false)}
            style={{
              position: "sticky", top: 0, zIndex: 10, background: "#FAFAF7",
              width: "100%", padding: "16px 0 8px", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#666",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 18 }}>←</span> Back to Meal Plan
          </button>

          <div style={{ marginBottom: 20 }}>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif", fontSize: 24,
              margin: "0 0 6px", color: "#1a1a1a",
            }}>
              Shopping List
            </h1>
            <div style={{ fontSize: 14, color: "#999" }}>
              {checkedCount} of {shoppingList.length} items checked
            </div>
          </div>

          {checkedCount > 0 && (
            <button
              onClick={clearShoppingChecks}
              style={{
                marginBottom: 16, padding: "8px 16px", borderRadius: 10,
                border: "1px solid #ddd", background: "white", fontSize: 13,
                color: "#888", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Clear all checks
            </button>
          )}

          <div style={{
            background: "white", borderRadius: 16,
            border: "1px solid #e8e8e4", overflow: "hidden",
          }}>
            {shoppingList.map((item, i) => {
              const isChecked = shoppingChecked[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => toggleShoppingItem(item.key)}
                  style={{
                    width: "100%", display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "14px 16px", background: "none", border: "none",
                    borderBottom: i < shoppingList.length - 1 ? "1px solid #f0f0f0" : "none",
                    cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                    opacity: isChecked ? 0.5 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    border: `2px solid ${isChecked ? "#4a8a4a" : "#ccc"}`,
                    background: isChecked ? "#4a8a4a" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}>
                    {isChecked && (
                      <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>✓</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 15, color: "#1a1a1a", lineHeight: 1.4,
                      textDecoration: isChecked ? "line-through" : "none",
                    }}>
                      {item.ingredient}
                      {item.count > 1 && (
                        <span style={{
                          marginLeft: 8, fontSize: 12, fontWeight: 600,
                          background: "#f0f0f0", padding: "2px 8px",
                          borderRadius: 10, color: "#666",
                        }}>
                          x{item.count}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#aaa", marginTop: 4, lineHeight: 1.4 }}>
                      {item.meals.join(" · ")}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Main view
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 32px" }}>

        {/* Header */}
        <div style={{ padding: "20px 0 16px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, margin: "0 0 2px", color: "#1a1a1a" }}>
            Meal Plan
          </h1>
          <div style={{ fontSize: 13, color: "#999", letterSpacing: 1 }}>
            ~2,200 cal · ~130g protein · daily
          </div>
        </div>

        {/* Day selector */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 20,
          background: "white", borderRadius: 14, padding: 4,
          border: "1px solid #e8e8e4",
        }}>
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 11, border: "none",
                cursor: "pointer", fontSize: 13, fontWeight: 600,
                fontFamily: "inherit",
                background: d === selectedDay ? "#1a1a1a" : "transparent",
                color: d === selectedDay ? "white" : d === today ? "#C47D2B" : "#888",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              {d}
              {d === today && d !== selectedDay && (
                <div style={{
                  width: 4, height: 4, borderRadius: 2,
                  background: "#C47D2B", margin: "3px auto 0",
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Daily summary */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 24,
          marginBottom: 20, fontSize: 14,
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#1a1a1a" }}>{dayCalories}</div>
            <div style={{ color: "#999", fontSize: 12 }}>calories</div>
          </div>
          <div style={{ width: 1, background: "#e0e0e0" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#1a1a1a" }}>{dayProtein}g</div>
            <div style={{ color: "#999", fontSize: 12 }}>protein</div>
          </div>
          <div style={{ width: 1, background: "#e0e0e0" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#1a1a1a" }}>
              {Object.values(SLOT_LABELS).filter((_, i) => checked[`${selectedDay}-${Object.keys(SLOT_LABELS)[i]}`]).length}/4
            </div>
            <div style={{ color: "#999", fontSize: 12 }}>logged</div>
          </div>
        </div>

        {/* Meal cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(SLOT_LABELS).map(([slot, label]) => {
            const mealId = dayPlan[slot];
            const meal = getMeal(mealId);
            if (!meal) return null;
            const colors = SLOT_COLORS[slot];
            const isChecked = checked[`${selectedDay}-${slot}`];

            return (
              <div
                key={slot}
                style={{
                  background: "white",
                  borderRadius: 16,
                  border: `1.5px solid ${isChecked ? "#ccc" : colors.border}`,
                  overflow: "hidden",
                  opacity: isChecked ? 0.55 : 1,
                  transition: "all 0.25s",
                }}
              >
                <div style={{ display: "flex", alignItems: "stretch" }}>
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleCheck(selectedDay, slot)}
                    style={{
                      width: 56, display: "flex", alignItems: "center", justifyContent: "center",
                      background: isChecked ? "#f5f5f5" : colors.bg,
                      border: "none", cursor: "pointer",
                      borderRight: `1px solid ${isChecked ? "#ddd" : colors.border}`,
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 7,
                      border: `2px solid ${isChecked ? "#aaa" : colors.accent}`,
                      background: isChecked ? colors.accent : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}>
                      {isChecked && <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>✓</span>}
                    </div>
                  </button>

                  {/* Meal info - tap to see recipe */}
                  <button
                    onClick={() => setOpenRecipe(mealId)}
                    style={{
                      flex: 1, padding: "14px 14px", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <div style={{
                      fontSize: 11, fontWeight: 600, textTransform: "uppercase",
                      letterSpacing: 0.8, color: isChecked ? "#aaa" : colors.accent, marginBottom: 4,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 4,
                      display: "flex", alignItems: "center", gap: 8,
                      textDecoration: isChecked ? "line-through" : "none",
                    }}>
                      <span>{meal.icon}</span> {meal.name}
                    </div>
                    <div style={{ fontSize: 13, color: "#999" }}>
                      {meal.cal} cal · {meal.protein}g protein
                      {meal.time && ` · ${meal.time}`}
                    </div>
                  </button>

                  {/* Swap button */}
                  <button
                    onClick={() => setSwapping({ day: selectedDay, slot })}
                    style={{
                      width: 44, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "none", border: "none", cursor: "pointer",
                      color: "#ccc", fontSize: 18, flexShrink: 0,
                    }}
                    title="Swap meal"
                  >
                    ⇄
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer reminder */}
        <div style={{
          marginTop: 24, padding: "14px 16px", borderRadius: 12,
          background: "#F8F6F0", border: "1px solid #E8E4D8",
          fontSize: 13, color: "#887755", lineHeight: 1.5, textAlign: "center",
        }}>
          <strong>Log before you eat.</strong> Weigh your portions. Enjoy every bite.
        </div>

        {/* Shopping list button */}
        <button
          onClick={() => setShowShoppingList(true)}
          style={{
            width: "100%", marginTop: 16, padding: "14px 0", borderRadius: 14,
            border: "1.5px solid #1a1a1a", background: "#1a1a1a", color: "white",
            fontSize: 15, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          Shopping List
        </button>
      </div>
    </div>
  );
}
