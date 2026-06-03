import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  Image, StyleSheet, SafeAreaView, StatusBar, FlatList, Modal, Platform
} from 'react-native';

const C = {
  pink: '#F472A8', pinkDark: '#C0336E', pinkLight: '#FFD6E7',
  pinkBg: '#FFF0F5', rose: '#FFF5F7', textDark: '#3D1020',
  textMid: '#7B3050', textLight: '#B06080', white: '#FFFFFF', peach: '#FFEEF4',
};

const RECIPES = [
  // ── BREAKFAST ──────────────────────────────────────────────
  { id:1, name:'Avocado Toast', cat:'Breakfast', kcal:220, protein:8, carbs:22, fat:13, time:'5 min', img:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=220&fit=crop', tags:['Vegan','Quick'], ingredients:['2 slices wholegrain bread','1 ripe avocado','1 lemon juiced','Red pepper flakes','Sea salt','Fresh dill'], steps:['Toast bread until golden.','Mash avocado with lemon, salt and pepper.','Spread on toast.','Top with red pepper flakes and dill.'] },
  { id:2, name:'Overnight Oats', cat:'Breakfast', kcal:295, protein:12, carbs:48, fat:6, time:'5 min+overnight', img:'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400&h=220&fit=crop', tags:['High fiber','Meal prep'], ingredients:['60g rolled oats','200ml oat milk','1 tbsp chia seeds','80g mixed berries','1 tbsp maple syrup','Cinnamon'], steps:['Combine oats, oat milk, chia seeds and syrup in a jar.','Stir and refrigerate overnight.','Top with berries and cinnamon in the morning.'] },
  { id:3, name:'Egg White Omelette', cat:'Breakfast', kcal:175, protein:22, carbs:6, fat:5, time:'10 min', img:'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=220&fit=crop', tags:['High protein','Low cal'], ingredients:['4 egg whites','50g baby spinach','30g feta','5 cherry tomatoes','1 tsp olive oil','Basil'], steps:['Whisk egg whites with salt and pepper.','Heat olive oil, pour in whites.','Add spinach, tomatoes and feta, fold and cook 1 min.'] },
  { id:4, name:'Greek Yogurt Parfait', cat:'Breakfast', kcal:310, protein:18, carbs:42, fat:6, time:'5 min', img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['200g low-fat Greek yogurt','80g granola','100g strawberries','1 tbsp honey','Blueberries','Fresh mint'], steps:['Spoon yogurt into a bowl.','Layer with granola and berries.','Drizzle with honey and garnish with mint.'] },
  { id:5, name:'Protein Pancakes', cat:'Breakfast', kcal:245, protein:20, carbs:28, fat:5, time:'15 min', img:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=220&fit=crop', tags:['High protein','Indulgent'], ingredients:['1 banana','2 eggs','1 scoop protein powder','1 tsp baking powder','1 tsp vanilla','Coconut oil','Fresh berries'], steps:['Mash banana, whisk in eggs, protein powder, baking powder and vanilla.','Heat coconut oil, pour small circles of batter.','Cook 2 min per side.','Serve with fresh berries.'] },
  { id:6, name:'Apple Cinnamon Oatmeal', cat:'Breakfast', kcal:265, protein:8, carbs:50, fat:4, time:'10 min', img:'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400&h=220&fit=crop', tags:['High fiber','Warming'], ingredients:['80g rolled oats','250ml almond milk','1 apple diced','1 tsp cinnamon','1 tbsp maple syrup','Walnuts','Nutmeg'], steps:['Cook oats with almond milk, stirring often.','Sauté apple with cinnamon 3 min.','Top oatmeal with cinnamon apple.','Drizzle with maple syrup and sprinkle walnuts.'] },
  { id:7, name:'Veggie Omelette', cat:'Breakfast', kcal:230, protein:17, carbs:8, fat:14, time:'12 min', img:'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=220&fit=crop', tags:['Vegetarian','Low carb'], ingredients:['3 whole eggs','1/2 bell pepper','4 mushrooms','30g cheddar','1 tsp butter','Chives'], steps:['Whisk eggs with salt and pepper.','Sauté vegetables in butter 3 min.','Pour eggs over vegetables on low heat.','Add cheese, fold and serve with chives.'] },
  { id:8, name:'Chia Seed Pudding', cat:'Breakfast', kcal:210, protein:8, carbs:24, fat:10, time:'5 min+2h', img:'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=220&fit=crop', tags:['Vegan','Meal prep'], ingredients:['4 tbsp chia seeds','250ml almond milk','1 tsp vanilla','1 tbsp maple syrup','Fresh mango','Kiwi'], steps:['Mix chia, almond milk, vanilla and syrup.','Refrigerate at least 2 hours.','Top with mango and kiwi before serving.'] },
  { id:9, name:'Smoothie Bowl', cat:'Breakfast', kcal:280, protein:10, carbs:48, fat:6, time:'10 min', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['Vegan','Antioxidant'], ingredients:['150g frozen berries','1 banana','100ml coconut milk','Granola','Sliced kiwi','Coconut flakes','Chia seeds'], steps:['Blend frozen berries, banana and coconut milk until thick.','Pour into a bowl.','Top with granola, kiwi, coconut flakes and chia seeds.'] },
  { id:10, name:'Cottage Cheese Toast', cat:'Breakfast', kcal:195, protein:16, carbs:20, fat:4, time:'5 min', img:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['2 slices rye bread','150g low-fat cottage cheese','Cherry tomatoes','Cucumber slices','Fresh dill','Black pepper'], steps:['Toast rye bread.','Spread cottage cheese generously.','Top with tomatoes, cucumber and dill.','Season with black pepper.'] },
  { id:11, name:'Banana Oat Muffins', cat:'Breakfast', kcal:175, protein:5, carbs:30, fat:4, time:'25 min', img:'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400&h=220&fit=crop', tags:['Meal prep','Vegan'], ingredients:['2 ripe bananas','150g rolled oats','2 tbsp maple syrup','1 tsp baking powder','1 tsp cinnamon','50g blueberries'], steps:['Mash bananas, mix in oats, syrup, baking powder and cinnamon.','Fold in blueberries.','Bake in muffin tin at 180°C for 18-20 minutes.'] },
  { id:12, name:'Spinach Egg Muffins', cat:'Breakfast', kcal:155, protein:14, carbs:4, fat:9, time:'25 min', img:'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=220&fit=crop', tags:['High protein','Meal prep'], ingredients:['6 eggs','80g baby spinach','40g feta','6 cherry tomatoes','1 tbsp olive oil','Salt & pepper'], steps:['Whisk eggs with salt and pepper.','Divide spinach, tomatoes and feta into muffin tin.','Pour egg mixture over.','Bake at 180°C for 18 minutes.'] },
  { id:13, name:'Acai Bowl', cat:'Breakfast', kcal:320, protein:6, carbs:58, fat:8, time:'10 min', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['Antioxidant','Vegan'], ingredients:['100g frozen acai puree','1 banana','100ml almond milk','Granola','Sliced strawberries','Honey','Hemp seeds'], steps:['Blend acai, banana and almond milk until thick.','Pour into a bowl.','Top with granola, strawberries, a drizzle of honey and hemp seeds.'] },
  { id:14, name:'Whole Wheat Crepes', cat:'Breakfast', kcal:235, protein:10, carbs:36, fat:5, time:'20 min', img:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=220&fit=crop', tags:['Vegetarian','Indulgent'], ingredients:['100g whole wheat flour','2 eggs','200ml skimmed milk','1 tsp vanilla','Pinch of salt','Greek yogurt','Berries'], steps:['Whisk flour, eggs, milk, vanilla and salt into a smooth batter.','Cook thin crepes in a lightly oiled pan.','Fill with Greek yogurt and fresh berries.'] },
  { id:15, name:'Green Detox Juice', cat:'Breakfast', kcal:85, protein:2, carbs:18, fat:1, time:'5 min', img:'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=220&fit=crop', tags:['Detox','Vegan','Very low cal'], ingredients:['2 stalks celery','1 cucumber','1 green apple','1 lemon juiced','1 tsp fresh ginger','Handful spinach','Water'], steps:['Add all ingredients to a blender with a splash of water.','Blend until smooth.','Strain through a fine sieve or enjoy as-is.'] },

  // ── LUNCH ──────────────────────────────────────────────────
  { id:16, name:'Greek Salad', cat:'Lunch', kcal:185, protein:6, carbs:14, fat:12, time:'10 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Low carb','Vegetarian'], ingredients:['200g romaine lettuce','100g cherry tomatoes','80g cucumber','60g feta','40g olives','2 tbsp olive oil','Red wine vinegar'], steps:['Chop all vegetables.','Combine in a bowl with olives.','Crumble feta on top.','Drizzle with olive oil and vinegar.'] },
  { id:17, name:'Quinoa Buddha Bowl', cat:'Lunch', kcal:420, protein:18, carbs:52, fat:14, time:'30 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['Vegan','Meal prep'], ingredients:['150g cooked quinoa','80g roasted chickpeas','1 avocado','Spinach','Cherry tomatoes','Tahini dressing','Lemon'], steps:['Cook quinoa.','Roast chickpeas at 200°C for 20 min.','Arrange quinoa, chickpeas, avocado and veggies in a bowl.','Drizzle with tahini and lemon.'] },
  { id:18, name:'Chicken Lettuce Wraps', cat:'Lunch', kcal:240, protein:28, carbs:10, fat:9, time:'20 min', img:'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=220&fit=crop', tags:['High protein','Low carb'], ingredients:['200g ground chicken','8 butter lettuce leaves','2 tbsp soy sauce','1 tbsp sesame oil','2 garlic cloves','Ginger','Spring onions'], steps:['Cook chicken in sesame oil with garlic and ginger.','Add soy sauce and cook 5 more min.','Spoon into lettuce cups.','Garnish with spring onions.'] },
  { id:19, name:'Tuna Stuffed Peppers', cat:'Lunch', kcal:210, protein:24, carbs:12, fat:7, time:'15 min', img:'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['2 large bell peppers','160g canned tuna','2 tbsp Greek yogurt','1 celery stalk','Lemon juice','Parsley'], steps:['Halve and deseed peppers.','Mix tuna with yogurt, celery, lemon and seasoning.','Fill pepper halves with tuna.','Garnish with parsley.'] },
  { id:20, name:'Spinach Feta Wrap', cat:'Lunch', kcal:285, protein:14, carbs:32, fat:11, time:'10 min', img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=220&fit=crop', tags:['Vegetarian','Quick'], ingredients:['1 whole wheat wrap','80g baby spinach','50g feta','4 sundried tomatoes','2 tbsp hummus','1/4 red onion','Oregano'], steps:['Spread hummus over wrap.','Layer spinach, feta, sundried tomatoes and red onion.','Sprinkle with oregano.','Roll tightly and slice in half.'] },
  { id:21, name:'Cauliflower Rice Bowl', cat:'Lunch', kcal:195, protein:8, carbs:22, fat:9, time:'20 min', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=220&fit=crop', tags:['Low carb','Vegan'], ingredients:['1 head cauliflower','1 can black beans','Corn','1 avocado','Lime juice','Cumin','Cilantro'], steps:['Pulse cauliflower until rice-like.','Cook 5 min with cumin and salt.','Top with beans, corn and avocado.','Finish with lime and cilantro.'] },
  { id:22, name:'Asian Chicken Salad', cat:'Lunch', kcal:310, protein:30, carbs:18, fat:12, time:'20 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['High protein','Refreshing'], ingredients:['180g cooked chicken','2 cups shredded cabbage','1 carrot julienned','Spring onions','2 tbsp sesame seeds','Soy-ginger dressing','Coriander'], steps:['Shred chicken into strips.','Toss cabbage, carrot, spring onions and chicken.','Dress with soy-ginger dressing.','Top with sesame seeds and coriander.'] },
  { id:23, name:'Lentil & Veggie Soup', cat:'Lunch', kcal:245, protein:14, carbs:36, fat:4, time:'35 min', img:'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=220&fit=crop', tags:['High fiber','Vegan'], ingredients:['200g red lentils','1 carrot','1 onion','2 tomatoes','Turmeric','Cumin','800ml broth'], steps:['Sauté onion and carrot.','Add lentils, tomatoes, spices and broth.','Simmer 25 min.','Blend partially for creamy texture.'] },
  { id:24, name:'Egg Salad Lettuce Cups', cat:'Lunch', kcal:220, protein:16, carbs:6, fat:14, time:'15 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Low carb','High protein'], ingredients:['4 boiled eggs','2 tbsp light mayo','1 tsp Dijon mustard','Celery','Chives','8 lettuce cups','Paprika'], steps:['Chop boiled eggs roughly.','Mix with mayo, mustard, celery and chives.','Spoon into lettuce cups.','Sprinkle with paprika.'] },
  { id:25, name:'Chickpea Salad', cat:'Lunch', kcal:295, protein:12, carbs:38, fat:10, time:'10 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['Vegan','Quick'], ingredients:['1 can chickpeas','1 cucumber diced','Cherry tomatoes','Red onion','Fresh parsley','Lemon juice','2 tbsp olive oil'], steps:['Drain and rinse chickpeas.','Combine with cucumber, tomatoes and onion.','Add parsley, lemon juice and olive oil.','Season and toss well.'] },
  { id:26, name:'Turkey & Avocado Wrap', cat:'Lunch', kcal:330, protein:28, carbs:28, fat:12, time:'10 min', img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['1 whole wheat wrap','120g sliced turkey breast','1/2 avocado','Romaine lettuce','2 tbsp light cream cheese','Tomato slices','Mustard'], steps:['Spread cream cheese and mustard on wrap.','Layer turkey, avocado, lettuce and tomato.','Roll tightly and slice diagonally.'] },
  { id:27, name:'Nicoise Salad', cat:'Lunch', kcal:340, protein:26, carbs:20, fat:16, time:'20 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['High protein','Classic'], ingredients:['160g canned tuna','2 boiled eggs','Green beans','Cherry tomatoes','Olives','Lettuce','Dijon vinaigrette'], steps:['Blanch green beans for 3 min.','Arrange lettuce, tuna, eggs, green beans, tomatoes and olives.','Drizzle with Dijon vinaigrette.'] },
  { id:28, name:'Zucchini Noodle Bowl', cat:'Lunch', kcal:175, protein:9, carbs:14, fat:9, time:'15 min', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=220&fit=crop', tags:['Low carb','Vegan'], ingredients:['2 large zucchini','Cherry tomatoes','Pine nuts','Fresh basil','2 tbsp olive oil','Garlic clove','Parmesan shavings'], steps:['Spiralize zucchini into noodles.','Sauté garlic in olive oil, add tomatoes.','Toss zucchini noodles in the pan 2 min.','Serve with pine nuts, basil and parmesan.'] },
  { id:29, name:'Pesto Chicken Bowl', cat:'Lunch', kcal:385, protein:36, carbs:16, fat:18, time:'25 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['High protein','Gluten-free'], ingredients:['180g chicken breast','2 tbsp basil pesto','80g cherry tomatoes','50g arugula','1/4 avocado','Lemon juice','Pine nuts'], steps:['Grill chicken breast 5-6 min per side.','Slice and toss with pesto.','Arrange on a bed of arugula with tomatoes and avocado.','Finish with lemon juice and pine nuts.'] },
  { id:30, name:'Minestrone Soup', cat:'Lunch', kcal:210, protein:8, carbs:32, fat:5, time:'40 min', img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=220&fit=crop', tags:['High fiber','Vegan'], ingredients:['1 can diced tomatoes','1 can white beans','1 zucchini','1 carrot','1 celery stalk','50g wholegrain pasta','Basil pesto'], steps:['Sauté carrot, celery and zucchini 5 min.','Add tomatoes, beans and 800ml water.','Simmer 20 min, add pasta and cook 10 more min.','Stir in pesto before serving.'] },

  // ── DINNER ─────────────────────────────────────────────────
  { id:31, name:'Grilled Salmon', cat:'Dinner', kcal:325, protein:38, carbs:8, fat:15, time:'25 min', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=220&fit=crop', tags:['High protein','Omega-3'], ingredients:['180g salmon fillet','1 lemon','2 tbsp olive oil','2 garlic cloves','Fresh dill','200g asparagus'], steps:['Marinate salmon with lemon, garlic and olive oil 15 min.','Grill 4 min per side.','Steam asparagus 5 min.','Serve together garnished with dill.'] },
  { id:32, name:'Zucchini Soup', cat:'Dinner', kcal:140, protein:5, carbs:16, fat:6, time:'20 min', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=220&fit=crop', tags:['Low cal','Vegan'], ingredients:['3 medium zucchini','1 onion','2 garlic cloves','500ml vegetable broth','1 tbsp olive oil','Fresh mint'], steps:['Sauté onion and garlic 3 min.','Add zucchini and cook 5 min.','Add broth and simmer 10 min.','Blend until smooth, garnish with mint.'] },
  { id:33, name:'Baked Chicken Breast', cat:'Dinner', kcal:285, protein:42, carbs:4, fat:10, time:'30 min', img:'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=220&fit=crop', tags:['High protein','Low carb'], ingredients:['200g chicken breast','1 tsp paprika','1 tsp garlic powder','1 tbsp olive oil','Rosemary','Lemon zest'], steps:['Rub chicken with olive oil, spices and lemon zest.','Bake at 200°C for 22-25 min.','Rest 5 min before slicing.'] },
  { id:34, name:'Shrimp Stir Fry', cat:'Dinner', kcal:275, protein:32, carbs:16, fat:8, time:'15 min', img:'https://images.unsplash.com/photo-1625943553852-781c6a5a5b9e?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['200g peeled shrimp','2 cups mixed vegetables','2 tbsp soy sauce','1 tbsp sesame oil','3 garlic cloves','Ginger','Spring onions'], steps:['Heat sesame oil in a wok.','Add garlic and ginger 30 sec.','Add shrimp and vegetables, cook 4-5 min.','Add soy sauce and serve with spring onions.'] },
  { id:35, name:'Turkey Meatball Soup', cat:'Dinner', kcal:305, protein:26, carbs:24, fat:10, time:'40 min', img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=220&fit=crop', tags:['High protein','Comforting'], ingredients:['250g ground turkey','1 egg','2 tbsp breadcrumbs','1 can diced tomatoes','600ml chicken broth','2 carrots','Fresh basil'], steps:['Mix turkey, egg and breadcrumbs, roll into balls.','Brown meatballs 5 min.','Add tomatoes, broth and carrots, simmer 25 min.','Garnish with basil.'] },
  { id:36, name:'Lentil Detox Soup', cat:'Dinner', kcal:260, protein:16, carbs:38, fat:4, time:'35 min', img:'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=220&fit=crop', tags:['High fiber','Detox'], ingredients:['200g red lentils','1 carrot','1 onion','2 tomatoes','Turmeric','Cumin','800ml broth'], steps:['Sauté onion and carrot.','Add lentils, tomatoes, spices and broth.','Simmer 25 min.','Blend partially.'] },
  { id:37, name:'Baked Cod with Veggies', cat:'Dinner', kcal:240, protein:34, carbs:14, fat:6, time:'30 min', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=220&fit=crop', tags:['High protein','Low fat'], ingredients:['180g cod fillet','1 zucchini','1 bell pepper','Cherry tomatoes','2 tbsp olive oil','Lemon','Herbs de Provence'], steps:['Chop vegetables and toss with olive oil and herbs.','Place cod on baking sheet surrounded by vegetables.','Bake at 200°C for 20-22 min.','Squeeze lemon before serving.'] },
  { id:38, name:'Stuffed Bell Peppers', cat:'Dinner', kcal:310, protein:22, carbs:28, fat:10, time:'45 min', img:'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=220&fit=crop', tags:['High protein','Meal prep'], ingredients:['4 large bell peppers','250g lean ground beef','100g cooked brown rice','1 can diced tomatoes','1 onion','Garlic','Italian herbs'], steps:['Cut tops off peppers and deseed.','Cook beef with onion and garlic.','Mix beef with rice, tomatoes and herbs.','Fill peppers and bake at 190°C for 30 min.'] },
  { id:39, name:'Detox Cucumber Soup', cat:'Dinner', kcal:95, protein:3, carbs:10, fat:4, time:'10 min', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=220&fit=crop', tags:['Very low cal','Vegan'], ingredients:['2 large cucumbers','200g Greek yogurt','2 garlic cloves','Fresh dill','1 tbsp lemon juice','200ml water'], steps:['Peel and chop cucumbers.','Blend with yogurt, garlic, dill, lemon and water.','Season generously.','Chill 30 min and serve cold.'] },
  { id:40, name:'Chicken Tikka (Light)', cat:'Dinner', kcal:290, protein:36, carbs:12, fat:9, time:'35 min', img:'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=220&fit=crop', tags:['High protein','Spicy'], ingredients:['200g chicken breast','150ml low-fat yogurt','1 tbsp tikka masala paste','1 can diced tomatoes','1 onion','Garlic','Ginger','Coriander'], steps:['Marinate chicken in yogurt and tikka paste 30 min.','Grill or bake chicken until cooked.','Simmer tomatoes, onion, garlic and ginger 15 min.','Combine and serve with fresh coriander.'] },
  { id:41, name:'Grilled Sea Bass', cat:'Dinner', kcal:255, protein:35, carbs:4, fat:11, time:'20 min', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=220&fit=crop', tags:['High protein','Omega-3'], ingredients:['180g sea bass fillet','1 lemon','2 tbsp olive oil','Capers','Fresh parsley','Garlic','Cherry tomatoes'], steps:['Score the fish skin with a knife.','Season with lemon, garlic and olive oil.','Grill skin-side down 4 min, flip and cook 3 more min.','Serve with capers, parsley and cherry tomatoes.'] },
  { id:42, name:'Eggplant Parmesan (Light)', cat:'Dinner', kcal:230, protein:12, carbs:24, fat:10, time:'40 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Vegetarian','Comforting'], ingredients:['1 large eggplant','1 cup tomato passata','50g low-fat mozzarella','30g parmesan','Fresh basil','Garlic','Olive oil'], steps:['Slice eggplant, brush with olive oil and grill.','Layer eggplant, passata and cheeses in a baking dish.','Bake at 190°C for 25 min.','Garnish with fresh basil.'] },
  { id:43, name:'Chicken Vegetable Soup', cat:'Dinner', kcal:195, protein:24, carbs:14, fat:5, time:'40 min', img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=220&fit=crop', tags:['High protein','Low cal'], ingredients:['200g chicken breast','2 carrots','2 celery stalks','1 onion','1 zucchini','800ml chicken broth','Fresh thyme'], steps:['Simmer chicken breast in broth 20 min then shred.','Add all vegetables and cook 15 more min.','Return chicken to pot.','Season and serve with fresh thyme.'] },
  { id:44, name:'Prawn Tacos (Light)', cat:'Dinner', kcal:310, protein:28, carbs:32, fat:9, time:'20 min', img:'https://images.unsplash.com/photo-1625943553852-781c6a5a5b9e?w=400&h=220&fit=crop', tags:['High protein','Fun'], ingredients:['200g prawns','4 small corn tortillas','Shredded cabbage','1 avocado','Lime juice','Sriracha','Greek yogurt dressing'], steps:['Season and cook prawns 2-3 min per side.','Warm tortillas in a dry pan.','Fill with cabbage, prawns and avocado.','Drizzle with Greek yogurt dressing and sriracha.'] },
  { id:45, name:'Mushroom Risotto (Light)', cat:'Dinner', kcal:320, protein:10, carbs:52, fat:8, time:'35 min', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=220&fit=crop', tags:['Vegetarian','Comforting'], ingredients:['150g arborio rice','250g mixed mushrooms','1 onion','2 garlic cloves','600ml vegetable broth','30g parmesan','Fresh thyme'], steps:['Sauté onion and garlic.','Add rice and toast 2 min.','Add broth ladle by ladle, stirring constantly.','Stir in mushrooms and parmesan, serve with thyme.'] },

  // ── SNACKS ─────────────────────────────────────────────────
  { id:46, name:'Caprese Snack', cat:'Snack', kcal:195, protein:11, carbs:8, fat:14, time:'5 min', img:'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=220&fit=crop', tags:['Low carb','Vegetarian'], ingredients:['100g fresh mozzarella','150g heirloom tomatoes','Fresh basil','1 tbsp olive oil','Balsamic glaze','Sea salt'], steps:['Slice mozzarella and tomatoes.','Alternate on a plate with basil.','Drizzle with olive oil and balsamic.','Season with sea salt.'] },
  { id:47, name:'Chia Pudding Snack', cat:'Snack', kcal:155, protein:7, carbs:18, fat:8, time:'5 min+2h', img:'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=220&fit=crop', tags:['High fiber','Vegan'], ingredients:['4 tbsp chia seeds','200ml coconut milk','1 tsp vanilla','1 tbsp maple syrup','Fresh mango','Mint'], steps:['Mix chia with coconut milk, vanilla and syrup.','Refrigerate 2 hours.','Top with mango and mint.'] },
  { id:48, name:'Watermelon Feta Salad', cat:'Snack', kcal:145, protein:5, carbs:20, fat:6, time:'10 min', img:'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=400&h=220&fit=crop', tags:['Low cal','Refreshing'], ingredients:['300g watermelon cubed','60g feta','Fresh mint','1 tbsp lime juice','1 tsp olive oil','Chili flakes'], steps:['Cube watermelon and arrange on a plate.','Crumble feta over top.','Add mint leaves.','Drizzle with lime and olive oil, sprinkle chili.'] },
  { id:49, name:'Stuffed Mushrooms', cat:'Snack', kcal:165, protein:9, carbs:8, fat:10, time:'25 min', img:'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&h=220&fit=crop', tags:['Low carb','Vegetarian'], ingredients:['8 large portobello caps','100g ricotta','30g parmesan','2 garlic cloves','Fresh thyme','Sundried tomatoes'], steps:['Preheat oven to 190°C.','Mix ricotta, parmesan, garlic, thyme and sundried tomatoes.','Fill mushroom caps.','Bake 18-20 min until golden.'] },
  { id:50, name:'Apple Almond Butter', cat:'Snack', kcal:175, protein:4, carbs:24, fat:8, time:'2 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Quick','Natural'], ingredients:['1 large apple','2 tbsp almond butter','Pinch of cinnamon'], steps:['Slice apple into wedges.','Serve with almond butter for dipping.','Sprinkle with cinnamon.'] },
  { id:51, name:'Hummus & Veggie Sticks', cat:'Snack', kcal:160, protein:6, carbs:18, fat:7, time:'5 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['Vegan','Quick'], ingredients:['100g hummus','1 carrot','1 cucumber','1 bell pepper','Celery sticks','Paprika'], steps:['Cut vegetables into sticks.','Arrange around a bowl of hummus.','Dust hummus with paprika and serve.'] },
  { id:52, name:'Edamame with Sea Salt', cat:'Snack', kcal:120, protein:11, carbs:10, fat:5, time:'5 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['High protein','Vegan'], ingredients:['200g frozen edamame','1 tsp sea salt flakes','1 tsp sesame oil','Sesame seeds'], steps:['Boil edamame 4-5 min.','Drain and toss with sesame oil and sea salt.','Sprinkle with sesame seeds and serve warm.'] },
  { id:53, name:'Rice Cakes with Smoked Salmon', cat:'Snack', kcal:185, protein:14, carbs:16, fat:6, time:'5 min', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['3 plain rice cakes','80g smoked salmon','2 tbsp light cream cheese','Capers','Lemon juice','Fresh dill'], steps:['Spread cream cheese on rice cakes.','Top with smoked salmon.','Add capers and a squeeze of lemon.','Garnish with fresh dill.'] },
  { id:54, name:'Kale Chips', cat:'Snack', kcal:90, protein:4, carbs:8, fat:5, time:'20 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Very low cal','Vegan'], ingredients:['1 bunch kale','1 tbsp olive oil','1/2 tsp sea salt','1/2 tsp garlic powder','Nutritional yeast'], steps:['Tear kale into bite-sized pieces.','Toss with olive oil, salt and garlic powder.','Spread on a baking sheet.','Bake at 150°C for 15-18 min until crispy.'] },
  { id:55, name:'Frozen Yogurt Bark', cat:'Snack', kcal:135, protein:8, carbs:20, fat:2, time:'5 min+2h freeze', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['Low fat','Vegetarian'], ingredients:['300g Greek yogurt','2 tbsp honey','Mixed berries','Granola','Dark chocolate chips'], steps:['Mix yogurt with honey and spread on a lined tray.','Top with berries, granola and chocolate chips.','Freeze for at least 2 hours.','Break into pieces and serve.'] },
  { id:56, name:'Cucumber Sushi Rolls', cat:'Snack', kcal:110, protein:8, carbs:8, fat:4, time:'15 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Low carb','Fun'], ingredients:['1 large cucumber','80g smoked salmon','50g cream cheese','1/2 avocado','Sesame seeds','Soy sauce'], steps:['Peel long thin strips of cucumber with a peeler.','Spread cream cheese on each strip.','Add salmon and avocado, roll tightly.','Secure with a toothpick, sprinkle sesame seeds.'] },
  { id:57, name:'Guacamole & Peppers', cat:'Snack', kcal:170, protein:3, carbs:12, fat:14, time:'10 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['Vegan','Low carb'], ingredients:['2 ripe avocados','1 lime juiced','1 tomato diced','1/4 onion','Fresh coriander','Sea salt','Bell pepper slices'], steps:['Mash avocados with lime juice.','Mix in tomato, onion and coriander.','Season with salt.','Serve with bell pepper slices for dipping.'] },
  { id:58, name:'Protein Energy Balls', cat:'Snack', kcal:145, protein:6, carbs:16, fat:7, time:'15 min+30 min chill', img:'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400&h=220&fit=crop', tags:['High protein','Meal prep'], ingredients:['100g rolled oats','2 tbsp peanut butter','2 tbsp honey','1 scoop protein powder','30g dark chocolate chips','1 tbsp chia seeds'], steps:['Mix all ingredients together in a bowl.','Refrigerate 30 min until firm.','Roll into small balls.','Store in the fridge for up to a week.'] },
  { id:59, name:'Greek Yogurt Dip', cat:'Snack', kcal:105, protein:9, carbs:8, fat:3, time:'5 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['150g Greek yogurt','1 garlic clove minced','1 tbsp lemon juice','Fresh mint','1 tsp olive oil','Pita chips or veggies'], steps:['Mix yogurt with garlic, lemon juice and mint.','Drizzle with olive oil.','Serve with pita chips or vegetable sticks.'] },
  { id:60, name:'Dark Chocolate & Almonds', cat:'Snack', kcal:160, protein:4, carbs:12, fat:11, time:'1 min', img:'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400&h=220&fit=crop', tags:['Quick','Indulgent'], ingredients:['20g dark chocolate (70%+)','20g raw almonds'], steps:['Simply portion 20g dark chocolate.','Pair with 20g raw almonds.','Eat slowly and mindfully to satisfy cravings.'] },

  // ── SMOOTHIES ──────────────────────────────────────────────
  { id:61, name:'Berry Smoothie', cat:'Smoothie', kcal:165, protein:9, carbs:28, fat:2, time:'5 min', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['150g mixed berries','200ml almond milk','1 scoop vanilla protein','1 tsp honey','Ice'], steps:['Add all ingredients to blender.','Blend 60 sec until smooth.','Serve in a chilled glass.'] },
  { id:62, name:'Mango Green Smoothie', cat:'Smoothie', kcal:180, protein:4, carbs:38, fat:2, time:'5 min', img:'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=220&fit=crop', tags:['Detox','Vegan'], ingredients:['1 ripe mango','2 handfuls spinach','200ml coconut water','1 banana','1 tsp ginger','Ice'], steps:['Add all to blender.','Blend until smooth.','Serve over ice immediately.'] },
  { id:63, name:'Pineapple Protein Smoothie', cat:'Smoothie', kcal:190, protein:14, carbs:30, fat:2, time:'5 min', img:'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=220&fit=crop', tags:['High protein','Tropical'], ingredients:['150g frozen pineapple','1 scoop vanilla protein','200ml coconut water','1/2 banana','1 tsp turmeric','Ice'], steps:['Add all to blender.','Blend until creamy.','Add more coconut water if too thick.'] },
  { id:64, name:'Blueberry Protein Smoothie', cat:'Smoothie', kcal:175, protein:16, carbs:22, fat:2, time:'5 min', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['High protein','Antioxidant'], ingredients:['150g frozen blueberries','1 scoop vanilla protein','200ml oat milk','1 tbsp almond butter','1 tsp honey','Ice'], steps:['Add blueberries, protein and oat milk to blender.','Add almond butter and honey.','Blend 60 sec.','Serve in a chilled glass.'] },
  { id:65, name:'Green Goddess Smoothie', cat:'Smoothie', kcal:145, protein:5, carbs:28, fat:3, time:'5 min', img:'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=220&fit=crop', tags:['Detox','Vegan'], ingredients:['2 handfuls spinach','1 banana','1/2 avocado','200ml coconut water','1 tsp spirulina','1 tbsp lemon juice','Ice'], steps:['Add all ingredients to blender.','Blend until completely smooth.','Serve immediately for best nutrition.'] },
  { id:66, name:'Strawberry Banana Smoothie', cat:'Smoothie', kcal:155, protein:6, carbs:32, fat:1, time:'5 min', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['Vegan','Classic'], ingredients:['150g frozen strawberries','1 banana','200ml oat milk','1 tbsp flaxseeds','1 tsp honey'], steps:['Add all to blender.','Blend until smooth.','Adjust sweetness with honey.','Serve immediately.'] },
  { id:67, name:'Chocolate Peanut Smoothie', cat:'Smoothie', kcal:240, protein:18, carbs:28, fat:7, time:'5 min', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['High protein','Indulgent'], ingredients:['1 banana','1 scoop chocolate protein','1 tbsp peanut butter','200ml almond milk','1 tsp cocoa powder','Ice'], steps:['Add all ingredients to blender.','Blend 60 sec until creamy.','Pour into a tall glass.','Top with a sprinkle of cocoa if desired.'] },
  { id:68, name:'Peach Ginger Smoothie', cat:'Smoothie', kcal:150, protein:4, carbs:34, fat:1, time:'5 min', img:'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=220&fit=crop', tags:['Anti-inflammatory','Vegan'], ingredients:['2 ripe peaches','1 banana','200ml almond milk','1 tsp fresh ginger','1 tsp turmeric','Pinch of black pepper','Ice'], steps:['Pit and chop peaches.','Add all to blender with ice.','Blend until smooth.','Serve in a chilled glass.'] },
  { id:69, name:'Kale Pineapple Detox', cat:'Smoothie', kcal:125, protein:3, carbs:28, fat:1, time:'5 min', img:'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=220&fit=crop', tags:['Detox','Very low cal'], ingredients:['2 kale leaves','150g frozen pineapple','1 cucumber','200ml coconut water','1 tbsp lemon juice','Fresh mint'], steps:['Remove kale stems.','Add all ingredients to blender.','Blend until completely smooth.','Garnish with mint and serve.'] },
  { id:70, name:'Watermelon Mint Cooler', cat:'Smoothie', kcal:90, protein:2, carbs:22, fat:0, time:'5 min', img:'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=220&fit=crop', tags:['Very low cal','Refreshing'], ingredients:['400g watermelon cubed','Fresh mint leaves','1 lime juiced','Pinch of salt','Ice cubes'], steps:['Add watermelon, mint, lime juice and salt to blender.','Blend until smooth.','Pour over ice and serve immediately.'] },
  { id:71, name:'Almond Butter Banana Shake', cat:'Smoothie', kcal:265, protein:10, carbs:36, fat:10, time:'5 min', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['High energy','Vegan'], ingredients:['2 ripe bananas','2 tbsp almond butter','250ml oat milk','1 tsp cinnamon','1 tbsp maple syrup','Ice'], steps:['Add all to blender.','Blend until creamy.','Taste and adjust sweetness.','Serve over ice.'] },
  { id:72, name:'Raspberry Coconut Smoothie', cat:'Smoothie', kcal:160, protein:5, carbs:26, fat:5, time:'5 min', img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=220&fit=crop', tags:['Antioxidant','Vegan'], ingredients:['150g frozen raspberries','200ml coconut milk','1 banana','1 tbsp chia seeds','1 tsp vanilla','Ice'], steps:['Add all to blender.','Blend until smooth.','Pour into a glass and top with extra chia seeds.'] },

  // ── MORE VARIETY ───────────────────────────────────────────
  { id:73, name:'Shakshouka (Light)', cat:'Breakfast', kcal:215, protein:14, carbs:16, fat:10, time:'25 min', img:'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=220&fit=crop', tags:['Vegetarian','Spicy'], ingredients:['4 eggs','1 can diced tomatoes','1 red bell pepper','1 onion','2 garlic cloves','1 tsp cumin','1 tsp paprika','Fresh parsley'], steps:['Sauté onion, pepper and garlic.','Add tomatoes and spices, simmer 10 min.','Make wells in the sauce and crack in eggs.','Cover and cook 5-8 min until whites are set.'] },
  { id:74, name:'Sweet Potato Soup', cat:'Dinner', kcal:220, protein:4, carbs:44, fat:5, time:'30 min', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=220&fit=crop', tags:['Vegan','Comforting'], ingredients:['2 large sweet potatoes','1 onion','2 garlic cloves','400ml coconut milk','400ml vegetable broth','1 tsp cumin','Fresh coriander'], steps:['Sauté onion and garlic.','Add cubed sweet potato, broth and coconut milk.','Simmer 20 min until tender.','Blend until smooth and serve with coriander.'] },
  { id:75, name:'Tabbouleh Salad', cat:'Lunch', kcal:165, protein:5, carbs:28, fat:6, time:'20 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Vegan','Fresh'], ingredients:['100g bulgur wheat','Large bunch fresh parsley','4 spring onions','2 tomatoes','1 cucumber','3 tbsp olive oil','2 tbsp lemon juice'], steps:['Cook bulgur according to package, cool.','Finely chop parsley, onions, tomatoes and cucumber.','Combine all ingredients.','Dress with olive oil and lemon, season well.'] },
  { id:76, name:'Miso Soup with Tofu', cat:'Dinner', kcal:95, protein:8, carbs:6, fat:4, time:'10 min', img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=220&fit=crop', tags:['Very low cal','Vegan'], ingredients:['2 tbsp white miso paste','600ml water','100g silken tofu','2 sheets nori','Spring onions','Wakame seaweed'], steps:['Bring water to a simmer (do not boil).','Dissolve miso paste in a ladleful of water.','Stir miso mixture back into pot.','Add tofu, nori and seaweed, serve topped with spring onions.'] },
  { id:77, name:'Grilled Veggie Platter', cat:'Dinner', kcal:175, protein:5, carbs:20, fat:9, time:'25 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Vegan','Low cal'], ingredients:['1 zucchini','1 eggplant','1 red pepper','8 asparagus spears','2 tbsp olive oil','Balsamic glaze','Fresh thyme'], steps:['Slice all vegetables.','Toss with olive oil and thyme.','Grill 3-4 min per side.','Drizzle with balsamic glaze before serving.'] },
  { id:78, name:'Tofu Scramble', cat:'Breakfast', kcal:195, protein:16, carbs:8, fat:11, time:'15 min', img:'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=220&fit=crop', tags:['Vegan','High protein'], ingredients:['300g firm tofu','1 tsp turmeric','1 tsp cumin','1/2 onion','1 bell pepper','Baby spinach','2 tbsp nutritional yeast'], steps:['Crumble tofu into a pan.','Add turmeric and cumin for colour.','Add onion, pepper and spinach.','Cook 8-10 min, stir in nutritional yeast.'] },
  { id:79, name:'Broccoli Cheddar Soup', cat:'Dinner', kcal:245, protein:12, carbs:20, fat:12, time:'30 min', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=220&fit=crop', tags:['Vegetarian','Comforting'], ingredients:['1 head broccoli','1 onion','2 garlic cloves','600ml vegetable broth','100ml low-fat milk','60g reduced-fat cheddar','Nutmeg'], steps:['Sauté onion and garlic.','Add broccoli and broth, simmer 15 min.','Blend until smooth.','Stir in milk and cheddar, season with nutmeg.'] },
  { id:80, name:'Sesame Tuna Steak', cat:'Dinner', kcal:295, protein:40, carbs:6, fat:12, time:'15 min', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['180g tuna steak','2 tbsp sesame seeds','1 tbsp soy sauce','1 tsp sesame oil','Ginger','Spring onions','Lime'], steps:['Press sesame seeds onto tuna steak.','Heat sesame oil in a pan.','Sear tuna 90 sec per side (serve pink inside).','Drizzle with soy, ginger, spring onions and lime.'] },
  { id:81, name:'Black Bean Tacos', cat:'Dinner', kcal:295, protein:12, carbs:44, fat:8, time:'15 min', img:'https://images.unsplash.com/photo-1625943553852-781c6a5a5b9e?w=400&h=220&fit=crop', tags:['Vegan','Quick'], ingredients:['1 can black beans','4 small corn tortillas','Shredded cabbage','1/2 avocado','Salsa','Lime juice','Cumin','Coriander'], steps:['Warm beans with cumin and coriander.','Heat tortillas in a dry pan.','Fill with beans, cabbage and avocado.','Top with salsa and a squeeze of lime.'] },
  { id:82, name:'Poke Bowl', cat:'Lunch', kcal:390, protein:28, carbs:42, fat:12, time:'20 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['High protein','Fresh'], ingredients:['150g sushi-grade tuna diced','80g brown rice','1/2 avocado','Edamame','Cucumber','Sesame seeds','Soy-ginger sauce','Nori strips'], steps:['Cook brown rice and cool slightly.','Cube tuna and marinate in soy-ginger sauce 5 min.','Assemble rice, tuna, avocado, edamame and cucumber.','Top with sesame seeds and nori strips.'] },
  { id:83, name:'Lemon Herb Chicken', cat:'Dinner', kcal:265, protein:38, carbs:4, fat:10, time:'30 min', img:'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=220&fit=crop', tags:['High protein','Classic'], ingredients:['200g chicken breast','2 tbsp lemon juice','1 tbsp olive oil','2 garlic cloves','Fresh rosemary','Fresh thyme','Salt & pepper'], steps:['Marinate chicken in lemon, olive oil, garlic and herbs.','Pan-fry 5-6 min per side until golden.','Rest 5 min before slicing.','Serve with a wedge of lemon.'] },
  { id:84, name:'Gazpacho', cat:'Lunch', kcal:85, protein:2, carbs:14, fat:4, time:'15 min+chill', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=220&fit=crop', tags:['Very low cal','Vegan'], ingredients:['500g ripe tomatoes','1 cucumber','1 red pepper','1/2 red onion','2 garlic cloves','2 tbsp olive oil','2 tbsp red wine vinegar'], steps:['Roughly chop all vegetables.','Blend until smooth.','Add olive oil and vinegar, season well.','Refrigerate 1 hour and serve cold.'] },
  { id:85, name:'Teriyaki Tofu Bowl', cat:'Dinner', kcal:310, protein:16, carbs:38, fat:10, time:'25 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['Vegan','High protein'], ingredients:['250g firm tofu','3 tbsp low-sodium teriyaki sauce','80g brown rice','Broccoli','Edamame','Sesame seeds','Spring onions'], steps:['Press tofu dry, cut into cubes.','Pan-fry until golden, add teriyaki sauce.','Serve over brown rice with broccoli and edamame.','Top with sesame seeds and spring onions.'] },
  { id:86, name:'Corn & Black Bean Salad', cat:'Lunch', kcal:235, protein:9, carbs:38, fat:7, time:'10 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Vegan','Quick'], ingredients:['1 can corn','1 can black beans','Cherry tomatoes','Red onion','Coriander','Lime juice','2 tbsp olive oil','Cumin'], steps:['Drain and rinse corn and beans.','Combine with tomatoes and red onion.','Add coriander, lime juice, olive oil and cumin.','Toss well and season.'] },
  { id:87, name:'Ceviche (Light)', cat:'Lunch', kcal:175, protein:22, carbs:10, fat:4, time:'20 min+marinate', img:'https://images.unsplash.com/photo-1625943553852-781c6a5a5b9e?w=400&h=220&fit=crop', tags:['High protein','Fresh'], ingredients:['200g white fish (sea bass)','3 limes juiced','1 red chili','1 small red onion','1 tomato','Fresh coriander','1/2 avocado'], steps:['Dice fish into small cubes.','Marinate in lime juice 15 min until opaque.','Add chili, onion, tomato and coriander.','Serve topped with avocado.'] },
  { id:88, name:'Spiced Lentil Patties', cat:'Dinner', kcal:225, protein:12, carbs:32, fat:6, time:'30 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['Vegan','High fiber'], ingredients:['200g cooked green lentils','1 onion','2 garlic cloves','1 tsp cumin','1 tsp coriander','2 tbsp flour','Fresh mint','Greek yogurt to serve'], steps:['Mash lentils with onion, garlic and spices.','Shape into patties, coat in flour.','Pan-fry 3-4 min per side until golden.','Serve with Greek yogurt and mint.'] },
  { id:89, name:'Warm Lentil Salad', cat:'Lunch', kcal:290, protein:14, carbs:36, fat:10, time:'25 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Vegan','High fiber'], ingredients:['200g puy lentils','1 red onion','2 carrots','Dijon mustard dressing','Fresh parsley','Walnuts','Arugula'], steps:['Cook lentils 20 min until tender, drain.','Roast carrots with red onion at 200°C for 15 min.','Combine warm lentils with roasted veg.','Dress with Dijon dressing, top with walnuts and parsley.'] },
  { id:90, name:'Baked Sweet Potato', cat:'Dinner', kcal:185, protein:4, carbs:42, fat:1, time:'50 min', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=220&fit=crop', tags:['Vegan','Low fat'], ingredients:['2 medium sweet potatoes','1 can black beans','Salsa','Greek yogurt','Lime juice','Coriander','Cumin'], steps:['Bake sweet potatoes at 200°C for 45 min.','Warm black beans with cumin.','Split potatoes open.','Fill with beans, salsa, yogurt and coriander.'] },
  { id:91, name:'Soba Noodle Salad', cat:'Lunch', kcal:310, protein:12, carbs:50, fat:8, time:'20 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['Vegan','Asian'], ingredients:['150g soba noodles','Shredded red cabbage','Edamame','Carrot julienned','Spring onions','Sesame dressing','Sesame seeds','Fresh coriander'], steps:['Cook soba noodles, rinse under cold water.','Combine with cabbage, edamame, carrot and spring onions.','Dress with sesame dressing.','Garnish with sesame seeds and coriander.'] },
  { id:92, name:'Vegetable Frittata', cat:'Breakfast', kcal:240, protein:18, carbs:10, fat:14, time:'25 min', img:'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=220&fit=crop', tags:['Vegetarian','Meal prep'], ingredients:['6 eggs','1 zucchini','1 red pepper','100g cherry tomatoes','50g feta','2 tbsp olive oil','Fresh basil'], steps:['Sauté vegetables in olive oil 5 min.','Whisk eggs with salt and pepper.','Pour eggs over vegetables in oven-safe pan.','Sprinkle feta and bake at 180°C for 15 min.'] },
  { id:93, name:'Spicy Chicken Rice Bowl', cat:'Dinner', kcal:380, protein:34, carbs:38, fat:9, time:'30 min', img:'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=220&fit=crop', tags:['High protein','Spicy'], ingredients:['180g chicken thigh (skinless)','80g brown rice','1 tbsp gochujang','Sesame oil','Broccoli','Kimchi','Spring onions','Sesame seeds'], steps:['Cook brown rice.','Marinate chicken in gochujang and sesame oil.','Grill or pan-fry chicken until cooked.','Serve over rice with broccoli, kimchi and spring onions.'] },
  { id:94, name:'Carrot Ginger Soup', cat:'Dinner', kcal:150, protein:3, carbs:28, fat:4, time:'30 min', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=220&fit=crop', tags:['Vegan','Anti-inflammatory'], ingredients:['6 large carrots','1 onion','2 tbsp fresh ginger','2 garlic cloves','400ml vegetable broth','200ml coconut milk','Coriander'], steps:['Sauté onion, garlic and ginger.','Add carrots and broth, simmer 20 min.','Blend until smooth.','Stir in coconut milk and serve with coriander.'] },
  { id:95, name:'Baked Falafel', cat:'Lunch', kcal:265, protein:10, carbs:34, fat:10, time:'35 min', img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=220&fit=crop', tags:['Vegan','High fiber'], ingredients:['1 can chickpeas','1/2 onion','2 garlic cloves','Cumin','Coriander','Fresh parsley','2 tbsp flour','Tahini to serve'], steps:['Blend chickpeas with onion, garlic, spices and parsley.','Shape into balls, roll in flour.','Bake at 200°C for 25 min, flipping halfway.','Serve with tahini sauce.'] },
  { id:96, name:'Salmon Nicoise', cat:'Lunch', kcal:365, protein:30, carbs:18, fat:18, time:'25 min', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=220&fit=crop', tags:['High protein','Omega-3'], ingredients:['150g salmon fillet','2 boiled eggs','Green beans','Cherry tomatoes','Olives','Mixed leaves','Dijon vinaigrette'], steps:['Pan-fry or grill salmon 4 min per side, flake.','Blanch green beans 3 min.','Arrange leaves, salmon, eggs, beans, tomatoes and olives.','Drizzle with Dijon vinaigrette.'] },
  { id:97, name:'Butternut Squash Soup', cat:'Dinner', kcal:175, protein:3, carbs:36, fat:4, time:'35 min', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=220&fit=crop', tags:['Vegan','Low cal'], ingredients:['1 butternut squash','1 onion','2 garlic cloves','400ml vegetable broth','200ml coconut milk','Nutmeg','Pumpkin seeds'], steps:['Roast squash at 200°C for 30 min.','Sauté onion and garlic.','Blend squash with onion, broth and coconut milk.','Season with nutmeg and top with pumpkin seeds.'] },
  { id:98, name:'Cauliflower Steaks', cat:'Dinner', kcal:195, protein:6, carbs:22, fat:10, time:'30 min', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=220&fit=crop', tags:['Vegan','Low cal'], ingredients:['1 large cauliflower','3 tbsp olive oil','1 tsp smoked paprika','1 tsp cumin','Garlic powder','Lemon','Fresh herbs'], steps:['Slice cauliflower into thick steaks.','Brush with olive oil and spices.','Roast at 210°C for 20-25 min.','Serve with lemon and fresh herbs.'] },
  { id:99, name:'Prawn Avocado Salad', cat:'Lunch', kcal:280, protein:24, carbs:10, fat:16, time:'15 min', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop', tags:['High protein','Quick'], ingredients:['200g cooked prawns','1 avocado','Mixed salad leaves','Cherry tomatoes','Cucumber','Lemon juice','1 tbsp olive oil','Fresh dill'], steps:['Arrange salad leaves on a plate.','Top with prawns, sliced avocado, tomatoes and cucumber.','Drizzle with lemon juice and olive oil.','Garnish with fresh dill.'] },
  { id:100, name:'Honey Garlic Salmon', cat:'Dinner', kcal:345, protein:36, carbs:14, fat:16, time:'20 min', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=220&fit=crop', tags:['High protein','Omega-3'], ingredients:['180g salmon fillet','2 tbsp honey','3 garlic cloves minced','1 tbsp soy sauce','1 tbsp olive oil','Fresh thyme','Lemon'], steps:['Mix honey, garlic, soy sauce and olive oil.','Coat salmon in the marinade.','Pan-fry skin-side down 4 min, flip and add remaining marinade.','Cook 3-4 more min, basting with sauce.'] },
];

const WEEK_PLAN = [
  { day: 'Monday', kcal: 1390, meals: [{ type: 'Breakfast', name: 'Overnight Oats', kcal: 295 }, { type: 'Lunch', name: 'Greek Salad', kcal: 185 }, { type: 'Snack', name: 'Chia Pudding Snack', kcal: 155 }, { type: 'Dinner', name: 'Grilled Salmon', kcal: 325 }] },
  { day: 'Tuesday', kcal: 1405, meals: [{ type: 'Breakfast', name: 'Egg White Omelette', kcal: 175 }, { type: 'Lunch', name: 'Quinoa Buddha Bowl', kcal: 420 }, { type: 'Snack', name: 'Caprese Snack', kcal: 195 }, { type: 'Dinner', name: 'Zucchini Soup', kcal: 140 }] },
  { day: 'Wednesday', kcal: 1380, meals: [{ type: 'Breakfast', name: 'Avocado Toast', kcal: 220 }, { type: 'Lunch', name: 'Chicken Lettuce Wraps', kcal: 240 }, { type: 'Snack', name: 'Berry Smoothie', kcal: 165 }, { type: 'Dinner', name: 'Lentil Detox Soup', kcal: 260 }] },
  { day: 'Thursday', kcal: 1415, meals: [{ type: 'Breakfast', name: 'Greek Yogurt Parfait', kcal: 310 }, { type: 'Lunch', name: 'Tuna Stuffed Peppers', kcal: 210 }, { type: 'Snack', name: 'Watermelon Feta Salad', kcal: 145 }, { type: 'Dinner', name: 'Baked Chicken Breast', kcal: 285 }] },
  { day: 'Friday', kcal: 1370, meals: [{ type: 'Breakfast', name: 'Protein Pancakes', kcal: 245 }, { type: 'Lunch', name: 'Spinach Feta Wrap', kcal: 285 }, { type: 'Snack', name: 'Stuffed Mushrooms', kcal: 165 }, { type: 'Dinner', name: 'Shrimp Stir Fry', kcal: 275 }] },
  { day: 'Saturday', kcal: 1400, meals: [{ type: 'Breakfast', name: 'Apple Cinnamon Oatmeal', kcal: 265 }, { type: 'Lunch', name: 'Asian Chicken Salad', kcal: 310 }, { type: 'Snack', name: 'Pineapple Protein Smoothie', kcal: 190 }, { type: 'Dinner', name: 'Turkey Meatball Soup', kcal: 305 }] },
  { day: 'Sunday', kcal: 1390, meals: [{ type: 'Breakfast', name: 'Veggie Omelette', kcal: 230 }, { type: 'Lunch', name: 'Poke Bowl', kcal: 390 }, { type: 'Snack', name: 'Hummus & Veggie Sticks', kcal: 160 }, { type: 'Dinner', name: 'Honey Garlic Salmon', kcal: 345 }] },
];

function HomeScreen({ onOpenRecipe }) {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <View style={s.banner}>
        <Text style={s.bannerTitle}>Good morning! ✨</Text>
        <Text style={s.bannerSub}>You're on your way to a healthier you 🌸</Text>
      </View>
      <View style={s.statsRow}>
        {[['🔥','1,240','kcal today'],['💧','6','glasses water'],['📉','−1.2kg','lost']].map(([icon,num,lbl]) => (
          <View key={lbl} style={s.statCard}>
            <Text style={s.statIcon}>{icon}</Text>
            <Text style={s.statNum}>{num}</Text>
            <Text style={s.statLbl}>{lbl}</Text>
          </View>
        ))}
      </View>
      <Text style={s.sectionTitle}>✨ Today's Picks</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {RECIPES.slice(0, 6).map(r => (
          <TouchableOpacity key={r.id} style={s.hCard} onPress={() => onOpenRecipe(r)}>
            <Image source={{ uri: r.img }} style={s.hCardImg} />
            <Text style={s.hCardName}>{r.name}</Text>
            <Text style={s.hCardCal}>🔥 {r.kcal} kcal</Text>
            <Text style={s.hCardTime}>⏱ {r.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={s.sectionTitle}>📊 Today's Macros</Text>
      <View style={s.macroCard}>
        {[['Protein',76,'#F472A8','68g / 90g'],['Carbs',79,'#FCD34D','95g / 120g'],['Fat',71,'#6EE7B7','32g / 45g']].map(([label,pct,color,val]) => (
          <View key={label} style={{ marginBottom: 12 }}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:4 }}>
              <Text style={s.macroLabel}>{label}</Text>
              <Text style={[s.macroLabel,{ color:C.pinkDark, fontWeight:'600' }]}>{val}</Text>
            </View>
            <View style={s.pbBg}><View style={[s.pbFill,{ width:pct+'%', backgroundColor:color }]} /></View>
          </View>
        ))}
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

function RecipesScreen({ onOpenRecipe }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const cats = ['All','Breakfast','Lunch','Dinner','Snack','Smoothie'];
  const filtered = RECIPES.filter(r => {
    const matchCat = filter === 'All' || r.cat === filter;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  return (
    <View style={s.screen}>
      <View style={s.searchBar}>
        <Text style={{ fontSize: 18 }}>🔍</Text>
        <TextInput style={s.searchInput} placeholder="Search recipes…" placeholderTextColor={C.textLight} value={search} onChangeText={setSearch} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
        {cats.map(c => (
          <TouchableOpacity key={c} style={[s.filterBtn, filter===c && s.filterBtnActive]} onPress={() => setFilter(c)}>
            <Text style={[s.filterBtnText, filter===c && { color: C.white }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filtered}
        keyExtractor={r => r.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: r }) => (
          <TouchableOpacity style={s.vCard} onPress={() => onOpenRecipe(r)}>
            <Image source={{ uri: r.img }} style={s.vCardImg} />
            <View style={s.vCardBody}>
              <Text style={s.vCardName}>{r.name}</Text>
              <View style={{ flexDirection:'row', flexWrap:'wrap', gap:4, marginBottom:6 }}>
                {r.tags.map(t => <Text key={t} style={s.tag}>{t}</Text>)}
              </View>
              <Text style={s.vCardMeta}>🔥 {r.kcal} kcal  💪 {r.protein}g  ⏱ {r.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function MealPlanScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <Text style={s.sectionTitle}>📅 This Week's Menu</Text>
      <Text style={[s.sectionTitle,{ fontSize:12, color:C.textLight, fontWeight:'400', marginTop:-8, marginBottom:12 }]}>
        Daily target: 1,400 kcal · Personalized for weight loss
      </Text>
      {WEEK_PLAN.map(d => (
        <View key={d.day} style={s.dayCard}>
          <View style={s.dayHeader}>
            <Text style={s.dayName}>{d.day}</Text>
            <Text style={s.dayCal}>🔥 {d.kcal} kcal</Text>
          </View>
          {d.meals.map(m => (
            <View key={m.type} style={s.mealRow}>
              <Text style={s.mealType}>{m.type}</Text>
              <Text style={s.mealName}>{m.name}</Text>
              <Text style={s.mealKcal}>{m.kcal}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

function DiaryScreen() {
  const entries = [
    { icon:'🌅', name:'Greek Yogurt Parfait', meal:'Breakfast · 8:30 AM', kcal:310 },
    { icon:'🥗', name:'Quinoa Buddha Bowl', meal:'Lunch · 1:00 PM', kcal:420 },
    { icon:'🍎', name:'Apple + Almond Butter', meal:'Snack · 4:00 PM', kcal:175 },
    { icon:'🍲', name:'Grilled Salmon & Veggies', meal:'Dinner · 7:30 PM', kcal:325 },
  ];
  const total = entries.reduce((sum, e) => sum + e.kcal, 0);
  const goal = 1400;
  const pct = Math.min(Math.round((total / goal) * 100), 100);
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <View style={s.diaryTotal}>
        <Text style={s.diaryTotalLabel}>Today's calories</Text>
        <Text style={s.diaryTotalNum}>{total} <Text style={{ fontSize:16, color:C.textLight }}>kcal</Text></Text>
        <Text style={{ fontSize:12, color:C.textMid, marginTop:2 }}>Goal: {goal} kcal · {goal - total} remaining</Text>
        <View style={[s.pbBg,{ marginTop:10 }]}><View style={[s.pbFill,{ width:pct+'%' }]} /></View>
      </View>
      <Text style={s.sectionTitle}>📓 Logged Meals</Text>
      {entries.map(e => (
        <View key={e.name} style={s.diaryEntry}>
          <Text style={{ fontSize:24 }}>{e.icon}</Text>
          <View style={{ flex:1, marginLeft:10 }}>
            <Text style={s.diaryEntryName}>{e.name}</Text>
            <Text style={s.diaryEntryMeta}>{e.meal}</Text>
          </View>
          <Text style={s.diaryEntryKcal}>{e.kcal}</Text>
        </View>
      ))}
      <TouchableOpacity style={s.addBtn}>
        <Text style={{ color:C.pink, fontSize:14 }}>＋ Add meal or snack</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

function BMIScreen() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const calc = () => {
    const h = parseFloat(height), w = parseFloat(weight);
    if (!h || !w || h < 100 || w < 30) return;
    const bmi = w / Math.pow(h / 100, 2);
    const rounded = Math.round(bmi * 10) / 10;
    let label, advice, color;
    if (bmi < 18.5) { label='Underweight 🫶'; advice='Focus on nutrient-dense foods. Consider consulting a nutritionist.'; color='#93C5FD'; }
    else if (bmi < 25) { label='Normal weight ✨'; advice='Great! Our meal plans will help you maintain your healthy weight.'; color='#86EFAC'; }
    else if (bmi < 30) { label='Overweight 💪'; advice='A 1,400 kcal daily plan with our recipes can help you reach your goal.'; color='#FCD34D'; }
    else { label='Obese — consult a doctor'; advice='Please consult a healthcare professional. Our recipes can support your journey.'; color='#F87171'; }
    setResult({ bmi: rounded, label, advice, color });
  };
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      <View style={s.bmiCard}>
        <Text style={s.sectionTitle}>📏 BMI Calculator</Text>
        {[['Height (cm)',height,setHeight,'165'],['Weight (kg)',weight,setWeight,'68']].map(([lbl,val,setter,ph]) => (
          <View key={lbl} style={{ marginBottom:12 }}>
            <Text style={s.inputLabel}>{lbl}</Text>
            <TextInput style={s.input} keyboardType="numeric" placeholder={`e.g. ${ph}`} placeholderTextColor={C.textLight} value={val} onChangeText={setter} />
          </View>
        ))}
        <TouchableOpacity style={s.calcBtn} onPress={calc}>
          <Text style={s.calcBtnText}>Calculate my BMI</Text>
        </TouchableOpacity>
        {result && (
          <View style={{ marginTop:20, alignItems:'center' }}>
            <Text style={s.bmiNum}>{result.bmi}</Text>
            <Text style={s.bmiLabel}>{result.label}</Text>
            <View style={[s.adviceBox,{ borderLeftColor:result.color }]}>
              <Text style={s.adviceText}>{result.advice}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={s.bmiCard}>
        <Text style={s.sectionTitle}>🎯 Your Daily Goal</Text>
        <View style={s.statsRow}>
          {[['🔥','1,400','kcal/day'],['📉','0.5kg','per week'],['📅','12wk','to goal']].map(([icon,num,lbl]) => (
            <View key={lbl} style={s.statCard}>
              <Text style={s.statIcon}>{icon}</Text>
              <Text style={s.statNum}>{num}</Text>
              <Text style={s.statLbl}>{lbl}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

function RecipeDetail({ recipe, onClose }) {
  if (!recipe) return null;
  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex:1, backgroundColor:C.white }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: recipe.img }} style={s.rdImg} />
          <TouchableOpacity style={s.rdBack} onPress={onClose}>
            <Text style={{ fontSize:20 }}>←</Text>
          </TouchableOpacity>
          <View style={{ padding:16 }}>
            <Text style={s.rdTitle}>{recipe.name}</Text>
            <View style={{ flexDirection:'row', flexWrap:'wrap', gap:6, marginBottom:16 }}>
              {recipe.tags.map(t => <Text key={t} style={s.tag}>{t}</Text>)}
            </View>
            <View style={s.macrosGrid}>
              {[['kcal',recipe.kcal],['protein',recipe.protein+'g'],['carbs',recipe.carbs+'g'],['fat',recipe.fat+'g']].map(([lbl,val]) => (
                <View key={lbl} style={s.macroTile}>
                  <Text style={s.macroTileNum}>{val}</Text>
                  <Text style={s.macroTileLbl}>{lbl}</Text>
                </View>
              ))}
            </View>
            <Text style={s.rdSection}>Ingredients</Text>
            {recipe.ingredients.map((ing,i) => <Text key={i} style={s.rdIng}>✓  {ing}</Text>)}
            <Text style={s.rdSection}>Instructions</Text>
            {recipe.steps.map((step,i) => (
              <View key={i} style={s.stepRow}>
                <View style={s.stepNum}><Text style={{ color:C.white, fontSize:11, fontWeight:'700' }}>{i+1}</Text></View>
                <Text style={s.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default function App() {
  const [tab, setTab] = useState('Home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const tabs = [
    { id:'Home', icon:'🏠', label:'Home' },
    { id:'Recipes', icon:'🥗', label:'Recipes' },
    { id:'Plan', icon:'📅', label:'Plan' },
    { id:'Diary', icon:'📓', label:'Diary' },
    { id:'BMI', icon:'📏', label:'BMI' },
  ];
  return (
    <SafeAreaView style={{ flex:1, backgroundColor:C.rose }}>
      <StatusBar barStyle="dark-content" backgroundColor={C.pink} />
      <View style={s.header}>
        <Text style={s.headerTitle}>🌸 SlimBloom</Text>
        <Text style={s.headerSub}>Your weight loss companion</Text>
      </View>
      <View style={{ flex:1 }}>
        {tab==='Home' && <HomeScreen onOpenRecipe={setSelectedRecipe} />}
        {tab==='Recipes' && <RecipesScreen onOpenRecipe={setSelectedRecipe} />}
        {tab==='Plan' && <MealPlanScreen />}
        {tab==='Diary' && <DiaryScreen />}
        {tab==='BMI' && <BMIScreen />}
      </View>
      <View style={s.bottomNav}>
        {tabs.map(t => (
          <TouchableOpacity key={t.id} style={s.navBtn} onPress={() => setTab(t.id)}>
            <Text style={[s.navIcon, tab===t.id && { opacity:1 }]}>{t.icon}</Text>
            <Text style={[s.navLabel, tab===t.id && { color:C.pinkDark, fontWeight:'700' }]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex:1, padding:16 },
  header: { backgroundColor:C.pink, padding:14, alignItems:'center' },
  headerTitle: { fontSize:20, fontWeight:'700', color:C.white },
  headerSub: { fontSize:12, color:'rgba(255,255,255,0.85)', marginTop:2 },
  banner: { backgroundColor:C.pinkDark, borderRadius:20, padding:18, marginBottom:16 },
  bannerTitle: { fontSize:18, fontWeight:'700', color:C.white, marginBottom:4 },
  bannerSub: { fontSize:12, color:'rgba(255,255,255,0.9)' },
  statsRow: { flexDirection:'row', gap:8, marginBottom:16 },
  statCard: { flex:1, backgroundColor:C.white, borderRadius:14, padding:10, alignItems:'center', borderWidth:0.5, borderColor:C.pinkLight },
  statIcon: { fontSize:20, marginBottom:2 },
  statNum: { fontSize:16, fontWeight:'700', color:C.pinkDark },
  statLbl: { fontSize:9, color:C.textLight, marginTop:2, textAlign:'center' },
  sectionTitle: { fontSize:15, fontWeight:'600', color:C.textDark, marginBottom:10 },
  hCard: { width:150, backgroundColor:C.white, borderRadius:16, overflow:'hidden', marginRight:10, borderWidth:0.5, borderColor:C.pinkLight },
  hCardImg: { width:'100%', height:90 },
  hCardName: { fontSize:12, fontWeight:'600', color:C.textDark, padding:8, paddingBottom:2 },
  hCardCal: { fontSize:11, color:C.pinkDark, paddingHorizontal:8 },
  hCardTime: { fontSize:10, color:C.textLight, padding:8, paddingTop:2 },
  macroCard: { backgroundColor:C.white, borderRadius:16, padding:14, borderWidth:0.5, borderColor:C.pinkLight, marginBottom:8 },
  macroLabel: { fontSize:12, color:C.textLight },
  pbBg: { height:6, backgroundColor:C.pinkLight, borderRadius:3, overflow:'hidden' },
  pbFill: { height:'100%', backgroundColor:C.pink, borderRadius:3 },
  searchBar: { flexDirection:'row', alignItems:'center', backgroundColor:C.white, borderRadius:12, padding:10, gap:8, marginBottom:12, borderWidth:0.5, borderColor:C.pinkLight },
  searchInput: { flex:1, fontSize:13, color:C.textDark },
  filterBtn: { paddingHorizontal:14, paddingVertical:6, borderRadius:20, borderWidth:1, borderColor:C.pinkLight, backgroundColor:C.white, marginRight:6 },
  filterBtnActive: { backgroundColor:C.pink, borderColor:C.pink },
  filterBtnText: { fontSize:12, color:C.textMid },
  vCard: { flexDirection:'row', backgroundColor:C.white, borderRadius:16, overflow:'hidden', marginBottom:10, borderWidth:0.5, borderColor:C.pinkLight },
  vCardImg: { width:90, height:90 },
  vCardBody: { flex:1, padding:10 },
  vCardName: { fontSize:13, fontWeight:'600', color:C.textDark, marginBottom:4 },
  vCardMeta: { fontSize:11, color:C.textLight },
  tag: { fontSize:10, paddingHorizontal:6, paddingVertical:2, borderRadius:8, backgroundColor:C.pinkBg, color:C.pinkDark, borderWidth:0.5, borderColor:C.pinkLight, marginRight:4 },
  dayCard: { backgroundColor:C.white, borderRadius:16, overflow:'hidden', marginBottom:10, borderWidth:0.5, borderColor:C.pinkLight },
  dayHeader: { backgroundColor:C.peach, padding:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  dayName: { fontSize:13, fontWeight:'600', color:C.textDark },
  dayCal: { fontSize:12, color:C.pinkDark },
  mealRow: { flexDirection:'row', alignItems:'center', padding:8, paddingHorizontal:14, borderBottomWidth:0.5, borderBottomColor:C.pinkBg },
  mealType: { fontSize:10, color:C.textLight, width:60 },
  mealName: { flex:1, fontSize:12, color:C.textDark },
  mealKcal: { fontSize:11, color:C.pinkDark, fontWeight:'600' },
  diaryTotal: { backgroundColor:C.pinkBg, borderRadius:16, padding:14, marginBottom:14, borderWidth:0.5, borderColor:C.pinkLight },
  diaryTotalLabel: { fontSize:12, color:C.textLight, marginBottom:4 },
  diaryTotalNum: { fontSize:28, fontWeight:'700', color:C.pinkDark },
  diaryEntry: { flexDirection:'row', alignItems:'center', backgroundColor:C.white, borderRadius:12, padding:10, marginBottom:8, borderWidth:0.5, borderColor:C.pinkLight },
  diaryEntryName: { fontSize:13, color:C.textDark },
  diaryEntryMeta: { fontSize:11, color:C.textLight },
  diaryEntryKcal: { fontSize:14, fontWeight:'700', color:C.pinkDark },
  addBtn: { borderWidth:1.5, borderColor:C.pinkLight, borderStyle:'dashed', borderRadius:12, padding:14, alignItems:'center', marginTop:8 },
  bmiCard: { backgroundColor:C.white, borderRadius:20, padding:20, borderWidth:0.5, borderColor:C.pinkLight, marginBottom:14 },
  inputLabel: { fontSize:12, color:C.textLight, marginBottom:4 },
  input: { borderWidth:1, borderColor:C.pinkLight, borderRadius:10, padding:10, fontSize:14, color:C.textDark, marginBottom:4 },
  calcBtn: { backgroundColor:C.pink, borderRadius:12, padding:14, alignItems:'center', marginTop:4 },
  calcBtnText: { color:C.white, fontSize:15, fontWeight:'700' },
  bmiNum: { fontSize:52, fontWeight:'700', color:C.pinkDark, lineHeight:58 },
  bmiLabel: { fontSize:15, color:C.textMid, marginTop:4, marginBottom:12 },
  adviceBox: { borderLeftWidth:3, borderRadius:8, backgroundColor:C.pinkBg, padding:12, width:'100%' },
  adviceText: { fontSize:13, color:C.textMid, lineHeight:20 },
  bottomNav: {
    flexDirection:'row',
    backgroundColor:C.white,
    borderTopWidth:0.5,
    borderTopColor:C.pinkLight,
    paddingTop:10,
    paddingBottom: 40,
  },
  navBtn: { flex:1, alignItems:'center' },
  navIcon: { fontSize:22, opacity:0.4 },
  navLabel: { fontSize:10, color:C.textLight, marginTop:3 },
  rdImg: { width:'100%', height:220 },
  rdBack: { position:'absolute', top:12, left:12, backgroundColor:'rgba(255,255,255,0.9)', borderRadius:20, width:36, height:36, alignItems:'center', justifyContent:'center' },
  rdTitle: { fontSize:22, fontWeight:'700', color:C.textDark, marginBottom:8 },
  macrosGrid: { flexDirection:'row', gap:8, marginBottom:16 },
  macroTile: { flex:1, backgroundColor:C.pinkBg, borderRadius:12, padding:10, alignItems:'center', borderWidth:0.5, borderColor:C.pinkLight },
  macroTileNum: { fontSize:16, fontWeight:'700', color:C.pinkDark },
  macroTileLbl: { fontSize:10, color:C.textLight, marginTop:2 },
  rdSection: { fontSize:15, fontWeight:'600', color:C.textDark, marginBottom:10, marginTop:16 },
  rdIng: { fontSize:13, color:C.textMid, paddingVertical:6, borderBottomWidth:0.5, borderBottomColor:C.pinkBg },
  stepRow: { flexDirection:'row', gap:10, marginBottom:10 },
  stepNum: { width:22, height:22, backgroundColor:C.pink, borderRadius:11, alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 },
  stepText: { flex:1, fontSize:13, color:C.textMid, lineHeight:20 },
});
