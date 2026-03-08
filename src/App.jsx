import { useState, useCallback, useEffect, useMemo, useRef } from "react";

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
    {
      id: "b6",
      name: "Baked Protein Pancake Pucks",
      time: "30 mins (batch)",
      cal: 440,
      protein: 33,
      icon: "🥞",
      ingredients: [
        "6 eggs (batch of 12 pucks / 6 portions)",
        "300g Greek yoghurt",
        "420ml milk",
        "210g plain flour",
        "150g protein powder",
        "3 tsp baking powder",
        "6 tbsp chia seeds",
        "300g raspberries (or mixed berries)",
      ],
      method:
        "Heat oven to 180°C (160°C fan). Whisk eggs, yoghurt and milk. Mix in flour, protein powder, baking powder and chia. Fold in berries. Pour into silicone muffin trays (two-thirds full). Bake 20–25 mins. Cool and freeze. Reheat: microwave 60–90 secs from frozen. Makes 12 pucks (2 per portion).",
    },
    {
      id: "b7",
      name: "Greek Yoghurt & Granola",
      time: "2 mins",
      cal: 445,
      protein: 16,
      icon: "🥣",
      ingredients: [
        "200g Greek yoghurt",
        "40g granola (weighed)",
      ],
      method: "Spoon yoghurt into a bowl. Weigh and add granola.",
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
    {
      id: "l6",
      name: "Veggie Chilli + Greek Yoghurt",
      time: "45 mins (batch)",
      cal: 580,
      protein: 25,
      icon: "🌶️",
      tags: ["🏢", "🏠"],
      ingredients: [
        "300g dried beans (any mix)",
        "1 large onion, diced",
        "2 peppers, diced",
        "2 cloves garlic",
        "2 × 400g tins chopped tomatoes",
        "1 tbsp olive oil",
        "2 tsp cumin, 2 tsp smoked paprika",
        "Chilli flakes, salt and pepper",
        "100g Greek yoghurt (per portion)",
      ],
      method:
        "Soak and cook beans. Soften onion, peppers and garlic in oil. Add spices, tomatoes and beans. Simmer 30 mins. Serve topped with Greek yoghurt. Makes 4 portions.",
    },
    {
      id: "l7",
      name: "Warm Winter Salad",
      time: "40 mins (batch)",
      cal: 580,
      protein: 28,
      icon: "🥗",
      tags: ["🏢", "🏠"],
      ingredients: [
        "250g lentil pasta (dry)",
        "1 medium butternut squash (~600g), cubed",
        "1 tin chickpeas (drained)",
        "1 large head broccoli, florets",
        "200g feta (50g per portion)",
        "30g mixed seeds",
        "2 tbsp olive oil",
        "Dressing of choice",
      ],
      method:
        "Roast cubed squash with chickpeas and broccoli at 200°C for 25–35 mins. Cook pasta. Combine, crumble feta, scatter seeds, dress. Makes 4 portions.",
    },
    {
      id: "l8",
      name: "Baked Dhal + Greek Yoghurt",
      time: "50 mins (batch)",
      cal: 740,
      protein: 25,
      icon: "🍛",
      tags: ["🏢", "🏠"],
      ingredients: [
        "250g red lentils (dry)",
        "1 onion, finely chopped",
        "2 cloves garlic",
        "1 tbsp olive oil",
        "2 tsp cumin, 1 tsp turmeric, chilli flakes",
        "1 × 400g tin chopped tomatoes",
        "750ml vegetable stock",
        "200ml coconut milk",
        "750g sweet potatoes, thinly sliced",
        "2 tbsp tamarind paste",
        "Lime juice",
        "150g Greek yoghurt (per portion)",
      ],
      method:
        "Soften onion and garlic with spices. Add lentils, tomatoes, stock and coconut milk. Simmer 5 mins. Pour into baking dish, top with sliced sweet potatoes and tamarind. Bake at 200°C for 30–40 mins. Finish with lime juice and yoghurt. Makes 4 portions.",
    },
    {
      id: "l9",
      name: "Sweet Potato Ginger & Coconut Stew",
      time: "40 mins (batch)",
      cal: 675,
      protein: 24,
      icon: "🍲",
      tags: ["🏢", "🏠"],
      ingredients: [
        "1 onion, chopped",
        "2 cloves garlic",
        "30g fresh ginger, grated",
        "1 tbsp olive oil",
        "600g sweet potatoes, cubed",
        "150g red lentils (dry)",
        "1 tin chickpeas (drained)",
        "1 × 400g tin chopped tomatoes",
        "800ml vegetable stock",
        "200ml coconut milk",
        "100g Greek yoghurt (per portion)",
      ],
      method:
        "Soften onion, garlic and ginger in oil. Add sweet potatoes, lentils, chickpeas, tomatoes, stock and coconut milk. Simmer 25–30 mins until tender. Serve topped with Greek yoghurt. Makes 4 portions.",
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
    {
      id: "d8",
      name: "Scrambled Eggs & Cottage Cheese on Toast",
      time: "8 mins",
      cal: 420,
      protein: 28,
      icon: "🍳",
      doubles: false,
      ingredients: [
        "3 eggs",
        "50g cottage cheese",
        "2 slices bread (~80g)",
        "1 tsp butter",
        "Salt and pepper",
      ],
      method:
        "Toast bread. Beat eggs with salt and pepper. Melt butter in a pan, scramble eggs gently until just set. Fold in cottage cheese. Serve on toast.",
    },
    {
      id: "d9",
      name: "Jacket Potato with Cottage Cheese & Salad",
      time: "60 mins (or 10 microwave)",
      cal: 500,
      protein: 28,
      icon: "🥔",
      doubles: false,
      ingredients: [
        "1 large baking potato (~300g)",
        "150g cottage cheese",
        "Mixed salad leaves",
        "Cherry tomatoes",
        "Cucumber",
        "Olive oil and vinegar",
        "Salt and pepper",
      ],
      method:
        "Bake potato at 200°C for 50–60 mins (or microwave 8–10 mins). Split open, fill with cottage cheese. Serve with salad dressed with oil and vinegar.",
    },
    {
      id: "d10",
      name: "Greek Salad Bowl",
      time: "10 mins",
      cal: 520,
      protein: 26,
      icon: "🥗",
      doubles: false,
      ingredients: [
        "150g cooked chickpeas (half a tin, drained)",
        "100g feta, cubed",
        "1 large tomato, chopped",
        "Half cucumber, chopped",
        "Quarter red onion, sliced",
        "50g olives",
        "2 tbsp olive oil",
        "1 tbsp lemon juice",
        "Dried oregano, salt and pepper",
      ],
      method:
        "Chop tomato, cucumber and onion. Combine with chickpeas and olives. Crumble feta over. Dress with olive oil, lemon juice and oregano.",
    },
    {
      id: "d11",
      name: "Tomato Soup & Cheese Toastie",
      time: "10 mins",
      cal: 460,
      protein: 19,
      icon: "🍲",
      doubles: false,
      ingredients: [
        "1 tin Heinz tomato soup (400g)",
        "2 slices bread",
        "40g cheddar cheese, grated",
        "1 tsp butter",
      ],
      method:
        "Heat soup. Butter bread, fill with cheese, toast in a dry pan until golden and cheese melts. Cut sandwich in half. Serve half with soup.",
    },
  ],
  snacks: [
    { id: "s1", name: "Apple + peanut butter", detail: "1 apple + 20g PB", cal: 200, protein: 6, icon: "🍎" },
    { id: "s2", name: "Mixed nuts + fruit", detail: "30g nuts + 1 piece fruit", cal: 230, protein: 6, icon: "🥜" },
    { id: "s3", name: "Rice cakes + cream cheese", detail: "2 rice cakes + 30g cream cheese + cucumber", cal: 160, protein: 4, icon: "🍘" },
    { id: "s4", name: "Protein shake", detail: "30g powder + 200ml milk", cal: 220, protein: 28, icon: "🥤" },
    { id: "s5", name: "Greek yoghurt + honey", detail: "150g yoghurt + 10g honey", cal: 180, protein: 15, icon: "🍯" },
    { id: "s6", name: "Hummus & veg sticks", detail: "60g hummus + carrot, cucumber, pepper sticks", cal: 170, protein: 6, icon: "🥕" },
    { id: "s7", name: "Wensleydale cheese", detail: "40g Wensleydale cheese", cal: 140, protein: 8, icon: "🧀" },
    { id: "s8", name: "Options hot chocolate", detail: "1 sachet Options hot chocolate + hot water", cal: 40, protein: 1, icon: "☕" },
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

const MOTIVATIONS = [
  "To feel in control",
  "To look great",
  "To move better",
  "To fit my clothes",
  "To accomplish something hard",
];

const USERS = {
  tom: { name: "Tom", showTargets: true },
  lyra: { name: "Lyra", showTargets: false },
};

const LS_WEEK_KEY = "mealplan-week";
const LS_CHECKED_KEY = "mealplan-checked";
const LS_SHOPPING_CHECKED_KEY = "mealplan-shopping-checked";
const LS_ACTIVE_USER_KEY = "mealplan-active-user";

function lsKey(base, user) { return `${base}-${user}`; }

// Migrate old non-scoped data to tom's keys (one-time)
function migrateToUserScoped() {
  try {
    const oldWeek = localStorage.getItem(LS_WEEK_KEY);
    if (oldWeek && !localStorage.getItem(lsKey(LS_WEEK_KEY, "tom"))) {
      localStorage.setItem(lsKey(LS_WEEK_KEY, "tom"), oldWeek);
      localStorage.removeItem(LS_WEEK_KEY);
    }
    const oldChecked = localStorage.getItem(LS_CHECKED_KEY);
    if (oldChecked && !localStorage.getItem(lsKey(LS_CHECKED_KEY, "tom"))) {
      localStorage.setItem(lsKey(LS_CHECKED_KEY, "tom"), oldChecked);
      localStorage.removeItem(LS_CHECKED_KEY);
    }
    const oldShopping = localStorage.getItem(LS_SHOPPING_CHECKED_KEY);
    if (oldShopping && !localStorage.getItem(lsKey(LS_SHOPPING_CHECKED_KEY, "tom"))) {
      localStorage.setItem(lsKey(LS_SHOPPING_CHECKED_KEY, "tom"), oldShopping);
      localStorage.removeItem(LS_SHOPPING_CHECKED_KEY);
    }
  } catch {}
}

migrateToUserScoped();

function loadWeek(user) {
  try {
    const stored = localStorage.getItem(lsKey(LS_WEEK_KEY, user));
    if (stored) {
      const parsed = JSON.parse(stored);
      const isValid = DAYS.every(
        (d) => parsed[d] && parsed[d].breakfast && parsed[d].lunch && parsed[d].dinner && parsed[d].snack
      );
      if (isValid) return parsed;
    }
  } catch {}
  return DEFAULT_WEEK;
}

function loadChecked(user) {
  try {
    const stored = localStorage.getItem(lsKey(LS_CHECKED_KEY, user));
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

function loadShoppingChecked(user) {
  try {
    const stored = localStorage.getItem(lsKey(LS_SHOPPING_CHECKED_KEY, user));
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

function loadActiveUser() {
  try {
    const stored = localStorage.getItem(LS_ACTIVE_USER_KEY);
    if (stored && USERS[stored]) return stored;
  } catch {}
  return "tom";
}

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

function getAllOptionsGrouped(slot) {
  const categories = ["breakfasts", "lunches", "dinners", "snacks"];
  const primary = slot === "snack" ? "snacks" : slot + "s";
  const labels = { breakfasts: "Breakfasts", lunches: "Lunches", dinners: "Dinners", snacks: "Snacks" };
  const ordered = [primary, ...categories.filter((c) => c !== primary)];
  return ordered.map((cat) => ({ label: labels[cat], meals: MEALS[cat], isPrimary: cat === primary }));
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
  const [activeUser, setActiveUser] = useState(loadActiveUser);
  const [week, setWeek] = useState(() => loadWeek(activeUser));
  const [checked, setChecked] = useState(() => loadChecked(activeUser));
  const [selectedDay, setSelectedDay] = useState(getTodayDay());
  const [openRecipe, setOpenRecipe] = useState(null);
  const [swapping, setSwapping] = useState(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showMotivation, setShowMotivation] = useState(true);
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const [shoppingChecked, setShoppingChecked] = useState(() => loadShoppingChecked(activeUser));

  const userConfig = USERS[activeUser];

  useEffect(() => {
    localStorage.setItem(lsKey(LS_WEEK_KEY, activeUser), JSON.stringify(week));
  }, [week, activeUser]);

  useEffect(() => {
    localStorage.setItem(lsKey(LS_CHECKED_KEY, activeUser), JSON.stringify(checked));
  }, [checked, activeUser]);

  useEffect(() => {
    localStorage.setItem(lsKey(LS_SHOPPING_CHECKED_KEY, activeUser), JSON.stringify(shoppingChecked));
  }, [shoppingChecked, activeUser]);

  useEffect(() => {
    localStorage.setItem(LS_ACTIVE_USER_KEY, activeUser);
  }, [activeUser]);

  const switchUser = useCallback((user) => {
    setActiveUser(user);
    setWeek(loadWeek(user));
    setChecked(loadChecked(user));
    setShoppingChecked(loadShoppingChecked(user));
    setOpenRecipe(null);
    setSwapping(null);
    setShowShoppingList(false);
    setShowWeeklySummary(false);
  }, []);

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

  const handleClearAll = useCallback(() => {
    if (window.confirm("Reset the entire week to defaults and clear all logged meals?")) {
      setWeek(DEFAULT_WEEK);
      setChecked({});
      setShoppingChecked({});
    }
  }, []);

  const handleShuffle = useCallback(() => {
    if (window.confirm("Randomise all meals for the week? This will clear logged meals.")) {
      const newWeek = {};
      const prev = {};
      DAYS.forEach((day) => {
        newWeek[day] = {};
        ["breakfast", "lunch", "dinner", "snack"].forEach((slot) => {
          const options = getOptions(slot);
          const prevId = prev[slot];
          let filtered = prevId ? options.filter((m) => m.id !== prevId) : options;
          if (filtered.length === 0) filtered = options;
          const pick = filtered[Math.floor(Math.random() * filtered.length)];
          newWeek[day][slot] = pick.id;
          prev[slot] = pick.id;
        });
      });
      setWeek(newWeek);
      setChecked({});
      setShoppingChecked({});
    }
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

  // Streak: count consecutive days (ending at today) with all 4 meals logged
  const streak = useMemo(() => {
    const todayIndex = DAYS.indexOf(today);
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const dayIdx = ((todayIndex - i) % 7 + 7) % 7;
      const d = DAYS[dayIdx];
      const allLogged = ["breakfast", "lunch", "dinner", "snack"].every(
        (slot) => checked[`${d}-${slot}`]
      );
      if (allLogged) count++;
      else break;
    }
    return count;
  }, [checked, today]);

  // Weekly summary stats
  const weeklySummary = useMemo(() => {
    let totalCal = 0, totalProtein = 0, logged = 0, total = 0;
    const dayStats = [];
    DAYS.forEach((d) => {
      const dp = week[d];
      let dayCal = 0, dayPro = 0, dayLogged = 0;
      ["breakfast", "lunch", "dinner", "snack"].forEach((slot) => {
        const m = getMeal(dp[slot]);
        dayCal += m?.cal || 0;
        dayPro += m?.protein || 0;
        total++;
        if (checked[`${d}-${slot}`]) { logged++; dayLogged++; }
      });
      totalCal += dayCal;
      totalProtein += dayPro;
      dayStats.push({ day: d, cal: dayCal, protein: dayPro, logged: dayLogged });
    });
    return { totalCal, totalProtein, avgProtein: Math.round(totalProtein / 7), logged, total, dayStats };
  }, [week, checked]);

  // Swipe between days
  const touchStart = useRef(null);
  const handleTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    touchStart.current = null;
    if (Math.abs(diff) < 50) return;
    setSelectedDay((prev) => {
      const i = DAYS.indexOf(prev);
      if (diff > 0) return DAYS[(i + 1) % 7];
      return DAYS[(i - 1 + 7) % 7];
    });
  }, []);

  // Recipe detail modal
  if (openRecipe) {
    const meal = getMeal(openRecipe);
    const slot = MEALS.breakfasts.find(m => m.id === openRecipe) ? "breakfast"
      : MEALS.lunches.find(m => m.id === openRecipe) ? "lunch"
      : MEALS.dinners.find(m => m.id === openRecipe) ? "dinner" : "snack";
    const colors = SLOT_COLORS[slot];

    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'DM Sans', sans-serif" }}>
        {/* Colored header band */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`,
          padding: "0 16px", minHeight: 120,
        }}>
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <button
              onClick={() => setOpenRecipe(null)}
              style={{
                position: "sticky", top: 0, zIndex: 10,
                width: "100%", padding: "16px 0 8px", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.8)",
                fontFamily: "inherit", background: "transparent", fontWeight: 500,
              }}
            >
              <span style={{ fontSize: 16 }}>←</span> Back to {selectedDay}
            </button>
            <div style={{ fontSize: 44, marginBottom: 4, marginTop: 4 }}>{meal.icon}</div>
          </div>
        </div>

        <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ padding: "16px 0 32px" }}>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, margin: "0 0 8px", color: "#1a1a1a", letterSpacing: -0.3 }}>
              {meal.name}
            </h1>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 13, marginBottom: 20 }}>
              <span style={{ color: "#999", display: "flex", alignItems: "center", gap: 4 }}>⏱ {meal.time}</span>
              <span style={{
                background: colors.tag, color: colors.accent, padding: "3px 12px",
                borderRadius: 20, fontWeight: 600, fontSize: 12,
              }}>
                {meal.cal} cal
              </span>
              <span style={{
                background: colors.tag, color: colors.accent, padding: "3px 12px",
                borderRadius: 20, fontWeight: 600, fontSize: 12,
              }}>
                {meal.protein}g protein
              </span>
            </div>

            {meal.tags && (
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {meal.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 12, background: "#f5f5f0", padding: "4px 12px",
                    borderRadius: 12, color: "#666", fontWeight: 500,
                  }}>
                    {t === "🏢" ? "🏢 Office" : "🏠 Home"}
                  </span>
                ))}
              </div>
            )}

            {meal.doubles !== undefined && (
              <div style={{
                fontSize: 13, padding: "10px 14px", borderRadius: 12, marginBottom: 20,
                background: meal.doubles ? "#E8F5E9" : "#FFF3E0",
                color: meal.doubles ? "#2E7D32" : "#E65100",
                fontWeight: 500,
              }}>
                {meal.doubles ? "✓ Doubles well — cook once, eat two nights" : "Best cooked fresh each time"}
              </div>
            )}

            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, margin: "0 0 12px", color: "#1a1a1a" }}>
              Ingredients
            </h2>
            <div style={{
              background: "white", borderRadius: 14, padding: "4px 0",
              border: "1px solid #e8e8e4", marginBottom: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}>
              {meal.ingredients.map((ing, i) => (
                <div
                  key={i}
                  style={{
                    padding: "11px 16px",
                    borderBottom: i < meal.ingredients.length - 1 ? "1px solid #f5f5f0" : "none",
                    fontSize: 14, color: "#333", lineHeight: 1.5,
                    display: "flex", alignItems: "flex-start", gap: 10,
                  }}
                >
                  <span style={{ color: colors.accent, fontSize: 8, marginTop: 6, flexShrink: 0 }}>●</span>
                  {ing}
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, margin: "0 0 12px", color: "#1a1a1a" }}>
              Method
            </h2>
            <div style={{
              background: "white", borderRadius: 14, padding: "16px",
              border: "1px solid #e8e8e4", fontSize: 14, lineHeight: 1.7, color: "#444",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
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
                  border: "1px solid #e8e8e4", fontSize: 14, color: "#444",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
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
    const groups = getAllOptionsGrouped(slot);
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
              display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#999",
              fontFamily: "inherit", fontWeight: 500,
            }}
          >
            <span style={{ fontSize: 16 }}>←</span> Back
          </button>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, margin: "8px 0 6px", color: "#1a1a1a", letterSpacing: -0.3 }}>
            Swap {SLOT_LABELS[slot]}
          </h1>
          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>{day}</div>
          <div style={{ paddingBottom: 32 }}>
            {groups.map((group) => (
              <div key={group.label}>
                <div style={{
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: 1.2, color: "#bbb", padding: "16px 0 8px",
                  borderTop: group.isPrimary ? "none" : "1px solid #f0ede8",
                  marginTop: group.isPrimary ? 0 : 8,
                }}>
                  {group.label}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {group.meals.map((meal) => {
                    const isCurrent = meal.id === current;
                    return (
                      <button
                        key={meal.id}
                        onClick={() => handleSwap(day, slot, meal.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 14,
                          padding: "12px 14px", borderRadius: 12,
                          background: isCurrent ? colors.tag : "white",
                          border: `1.5px solid ${isCurrent ? colors.accent : "#e8e8e4"}`,
                          cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                          transition: "all 0.15s",
                          boxShadow: isCurrent ? `0 2px 8px ${colors.accent}22` : "0 1px 3px rgba(0,0,0,0.04)",
                        }}
                      >
                        <span style={{ fontSize: 26, flexShrink: 0 }}>{meal.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a", marginBottom: 2 }}>
                            {meal.name} {isCurrent && <span style={{ color: colors.accent }}>✓</span>}
                          </div>
                          <div style={{ fontSize: 12, color: "#999" }}>
                            {meal.cal} cal · {meal.protein}g protein
                            {meal.time && ` · ${meal.time}`}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Weekly summary view
  if (showWeeklySummary) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 32px" }}>
          <button
            onClick={() => setShowWeeklySummary(false)}
            style={{
              position: "sticky", top: 0, zIndex: 10, background: "#FAFAF7",
              width: "100%", padding: "16px 0 8px", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#999",
              fontFamily: "inherit", fontWeight: 500,
            }}
          >
            <span style={{ fontSize: 16 }}>←</span> Back to Meal Plan
          </button>

          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, margin: "0 0 20px", color: "#1a1a1a", letterSpacing: -0.3 }}>
            📊 Weekly Summary
          </h1>

          {/* Top-level stats */}
          <div style={{
            display: "flex", justifyContent: "center", gap: 20, marginBottom: 24,
            background: "white", borderRadius: 14, border: "1px solid #e8e8e4", padding: "20px 16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 22, color: "#D4842C" }}>
                {Math.round(weeklySummary.totalCal / 7)}
              </div>
              <div style={{ color: "#aaa", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>avg cal / day</div>
            </div>
            <div style={{ width: 1, background: "#f0ede8" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 22, color: "#4a8a4a" }}>{weeklySummary.avgProtein}g</div>
              <div style={{ color: "#aaa", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>avg protein / day</div>
            </div>
            <div style={{ width: 1, background: "#f0ede8" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 22, color: "#1a1a1a" }}>
                {weeklySummary.logged}/{weeklySummary.total}
              </div>
              <div style={{ color: "#aaa", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>meals logged</div>
            </div>
          </div>

          {/* Per-day breakdown */}
          <div style={{
            background: "white", borderRadius: 14, border: "1px solid #e8e8e4", overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            {weeklySummary.dayStats.map((ds, i) => (
              <div
                key={ds.day}
                style={{
                  display: "flex", alignItems: "center", padding: "14px 16px",
                  borderBottom: i < 6 ? "1px solid #f5f5f0" : "none",
                  background: ds.day === today ? "#FFFBF5" : "transparent",
                }}
              >
                <div style={{ width: 40, fontWeight: 700, fontSize: 14, color: ds.day === today ? "#D4842C" : "#1a1a1a" }}>
                  {ds.day}
                </div>
                <div style={{ flex: 1, fontSize: 12, color: "#999" }}>
                  {ds.cal} cal · {ds.protein}g
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2, 3].map((j) => (
                    <div key={j} style={{
                      width: 10, height: 10, borderRadius: 5,
                      background: j < ds.logged ? "linear-gradient(135deg, #4a8a4a, #5a9a5a)" : "#eee",
                      transition: "background 0.2s",
                    }} />
                  ))}
                </div>
              </div>
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
              display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#999",
              fontFamily: "inherit", fontWeight: 500,
            }}
          >
            <span style={{ fontSize: 16 }}>←</span> Back to Meal Plan
          </button>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
            <div>
              <h1 style={{
                fontFamily: "'DM Serif Display', serif", fontSize: 24,
                margin: "0 0 4px", color: "#1a1a1a", letterSpacing: -0.3,
              }}>
                🛒 Shopping List
              </h1>
              <div style={{ fontSize: 13, color: "#aaa" }}>
                {checkedCount} of {shoppingList.length} items
              </div>
            </div>
            {checkedCount > 0 && (
              <button
                onClick={clearShoppingChecks}
                style={{
                  padding: "6px 14px", borderRadius: 8,
                  border: "1px solid #e8e8e4", background: "white", fontSize: 12,
                  color: "#999", cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                Clear checks
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div style={{
            display: "flex", gap: 2, borderRadius: 4, overflow: "hidden", marginBottom: 16, height: 4,
          }}>
            <div style={{
              width: shoppingList.length > 0 ? `${(checkedCount / shoppingList.length) * 100}%` : 0,
              background: "linear-gradient(90deg, #4a8a4a, #5a9a5a)",
              borderRadius: 4, transition: "width 0.3s",
            }} />
            <div style={{ flex: 1, background: "#eee", borderRadius: 4 }} />
          </div>

          <div style={{
            background: "white", borderRadius: 14,
            border: "1px solid #e8e8e4", overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            {shoppingList.map((item, i) => {
              const isChecked = shoppingChecked[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => toggleShoppingItem(item.key)}
                  style={{
                    width: "100%", display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "12px 14px", background: isChecked ? "#FAFAF7" : "none", border: "none",
                    borderBottom: i < shoppingList.length - 1 ? "1px solid #f5f5f0" : "none",
                    cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                    opacity: isChecked ? 0.55 : 1,
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    border: `2px solid ${isChecked ? "#4a8a4a" : "#d0d0d0"}`,
                    background: isChecked ? "#4a8a4a" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}>
                    {isChecked && (
                      <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>✓</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14, color: isChecked ? "#999" : "#1a1a1a", lineHeight: 1.4,
                      textDecoration: isChecked ? "line-through" : "none",
                      textDecorationColor: "#ccc",
                    }}>
                      {item.ingredient}
                      {item.count > 1 && (
                        <span style={{
                          marginLeft: 8, fontSize: 11, fontWeight: 600,
                          background: "#f5f0eb", padding: "2px 8px",
                          borderRadius: 10, color: "#D4842C",
                        }}>
                          x{item.count}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "#bbb", marginTop: 3, lineHeight: 1.4 }}>
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
    <div
      style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'DM Sans', sans-serif" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 32px" }}>

        {/* Header */}
        <div style={{ padding: "24px 0 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, margin: 0, color: "#1a1a1a", letterSpacing: -0.5 }}>
                Meal Plan
              </h1>
              {userConfig.showTargets && (
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 2, letterSpacing: 0.5 }}>
                  ~2,200 cal · ~130g protein · daily
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {streak > 0 && (
                <div style={{
                  fontSize: 12, fontWeight: 700,
                  background: "linear-gradient(135deg, #FFF3E0, #FFE0B2)", color: "#E65100",
                  padding: "5px 12px", borderRadius: 20,
                  boxShadow: "0 1px 3px rgba(230,81,0,0.15)",
                }}>
                  🔥 {streak}
                </div>
              )}
              <div style={{
                display: "flex", background: "white", borderRadius: 10, padding: 3,
                border: "1px solid #e8e8e4", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                {Object.entries(USERS).map(([key, u]) => (
                  <button
                    key={key}
                    onClick={() => switchUser(key)}
                    style={{
                      padding: "6px 16px", borderRadius: 8, border: "none",
                      fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                      background: key === activeUser ? "linear-gradient(135deg, #D4842C, #C47D2B)" : "transparent",
                      color: key === activeUser ? "white" : "#999",
                      transition: "all 0.2s",
                    }}
                  >
                    {u.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Day selector */}
        <div style={{
          display: "flex", gap: 3, marginBottom: 20,
          background: "white", borderRadius: 14, padding: 4,
          border: "1px solid #e8e8e4", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}>
          {DAYS.map((d) => {
            const isSelected = d === selectedDay;
            const isToday = d === today;
            return (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                style={{
                  flex: 1, padding: "12px 0 10px", borderRadius: 11, border: "none",
                  cursor: "pointer", fontSize: 13, fontWeight: isSelected ? 700 : 600,
                  fontFamily: "inherit",
                  background: isSelected ? "linear-gradient(135deg, #D4842C, #C47D2B)" : "transparent",
                  color: isSelected ? "white" : isToday ? "#D4842C" : "#999",
                  transition: "all 0.2s",
                  position: "relative",
                }}
              >
                {d}
                {isToday && !isSelected && (
                  <div style={{
                    width: 5, height: 5, borderRadius: 3,
                    background: "#D4842C", margin: "4px auto 0",
                  }} />
                )}
                {isSelected && isToday && (
                  <div style={{
                    width: 5, height: 5, borderRadius: 3,
                    background: "rgba(255,255,255,0.6)", margin: "4px auto 0",
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Daily summary */}
        {(() => {
          const loggedCount = Object.values(SLOT_LABELS).filter((_, i) => checked[`${selectedDay}-${Object.keys(SLOT_LABELS)[i]}`]).length;
          return (
            <div style={{
              background: "white", borderRadius: 14, padding: "16px 20px",
              marginBottom: 16, border: "1px solid #e8e8e4",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 22, color: "#D4842C" }}>{dayCalories}</div>
                  <div style={{ color: "#aaa", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>calories</div>
                </div>
                <div style={{ width: 1, background: "#f0ede8" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 22, color: "#4a8a4a" }}>{dayProtein}g</div>
                  <div style={{ color: "#aaa", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>protein</div>
                </div>
                <div style={{ width: 1, background: "#f0ede8" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 22, color: "#1a1a1a" }}>{loggedCount}/4</div>
                  <div style={{ color: "#aaa", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>logged</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, borderRadius: 4, overflow: "hidden" }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{
                    flex: 1, height: 4, borderRadius: 2,
                    background: i < loggedCount ? "linear-gradient(90deg, #4a8a4a, #5a9a5a)" : "#eee",
                    transition: "background 0.3s",
                  }} />
                ))}
              </div>
            </div>
          );
        })()}

        {/* Motivation card */}
        <button
          onClick={() => setShowMotivation((p) => !p)}
          style={{
            width: "100%", marginBottom: 14, padding: showMotivation ? "10px 14px 12px" : "10px 14px",
            borderRadius: 12,
            background: "linear-gradient(135deg, #F8F0FF, #F0E8FA)", border: "1px solid #E0D0F0",
            cursor: "pointer", textAlign: "left", fontFamily: "inherit",
            boxShadow: "0 1px 3px rgba(123,94,167,0.08)",
            transition: "all 0.2s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#7B5EA7", display: "flex", alignItems: "center", gap: 6 }}>
              💜 Why I'm doing this
              {!showMotivation && (
                <span style={{ fontSize: 11, color: "#B09ACC", fontWeight: 400 }}>
                  — {MOTIVATIONS.slice(0, 2).join(", ")}…
                </span>
              )}
            </span>
            <span style={{
              fontSize: 11, color: "#7B5EA7", fontWeight: 600,
              width: 22, height: 22, borderRadius: 11,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(123,94,167,0.1)",
            }}>
              {showMotivation ? "−" : "+"}
            </span>
          </div>
          {showMotivation && (
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {MOTIVATIONS.map((m) => (
                <span key={m} style={{
                  fontSize: 11, padding: "4px 10px", borderRadius: 20,
                  background: "rgba(255,255,255,0.7)", color: "#5C3D8F", fontWeight: 500,
                }}>
                  {m}
                </span>
              ))}
            </div>
          )}
        </button>

        {/* Meal cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
                  borderRadius: 14,
                  border: `1px solid ${isChecked ? "#e8e8e4" : colors.border}`,
                  overflow: "hidden",
                  opacity: isChecked ? 0.6 : 1,
                  transition: "all 0.25s",
                  boxShadow: isChecked ? "none" : "0 1px 4px rgba(0,0,0,0.05)",
                  borderLeft: `4px solid ${isChecked ? "#ccc" : colors.accent}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "stretch" }}>
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleCheck(selectedDay, slot)}
                    style={{
                      width: 48, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "transparent",
                      border: "none", cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: 6,
                      border: `2px solid ${isChecked ? "#aaa" : colors.accent}`,
                      background: isChecked ? colors.accent : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}>
                      {isChecked && <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>✓</span>}
                    </div>
                  </button>

                  {/* Meal info - tap to see recipe */}
                  <button
                    onClick={() => setOpenRecipe(mealId)}
                    style={{
                      flex: 1, padding: "12px 8px 12px 0", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <div style={{
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: 1, color: isChecked ? "#bbb" : colors.accent, marginBottom: 3,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontSize: 15, fontWeight: 600, color: isChecked ? "#999" : "#1a1a1a", marginBottom: 3,
                      display: "flex", alignItems: "center", gap: 8,
                      textDecoration: isChecked ? "line-through" : "none",
                      textDecorationColor: "#ccc",
                    }}>
                      <span style={{ fontSize: 20 }}>{meal.icon}</span> {meal.name}
                    </div>
                    <div style={{ fontSize: 12, color: isChecked ? "#bbb" : "#999" }}>
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
                      color: isChecked ? "#ddd" : "#bbb", fontSize: 18, flexShrink: 0,
                      borderLeft: "1px solid #f0f0f0",
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

        {/* Footer buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button
            onClick={() => setShowShoppingList(true)}
            style={{
              flex: 1, padding: "14px 0", borderRadius: 14,
              border: "none", background: "linear-gradient(135deg, #D4842C, #C47D2B)", color: "white",
              fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(212,132,44,0.3)",
            }}
          >
            🛒 Shopping List
          </button>
          <button
            onClick={() => setShowWeeklySummary(true)}
            style={{
              flex: 1, padding: "14px 0", borderRadius: 14,
              border: "none", background: "linear-gradient(135deg, #D4842C, #C47D2B)", color: "white",
              fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(212,132,44,0.3)",
            }}
          >
            📊 Weekly Summary
          </button>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button
            onClick={handleShuffle}
            style={{
              flex: 1, padding: "13px 0", borderRadius: 14,
              border: "1px solid #e8e8e4", background: "white", color: "#888",
              fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            🔀 Shuffle Week
          </button>
          <button
            onClick={handleClearAll}
            style={{
              flex: 1, padding: "13px 0", borderRadius: 14,
              border: "1px solid #e8e8e4", background: "white", color: "#888",
              fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            🗑 Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
