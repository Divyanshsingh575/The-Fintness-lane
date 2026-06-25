// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// AOS
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { margin: '-80px' });
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Counter
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target);
    let start = 0;
    const step = Math.ceil(target / 80);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
      else el.textContent = start + '+';
    }, 20);
    counterObs.unobserve(el);
  });
}, { margin: '-60px' });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

// Diet Plans
const dietPlans = {
  underweight: {
    label: 'Underweight', color: '#3b82f6',
    goal: 'Gain healthy weight & build muscle mass',
    calories: '2800 – 3200 kcal/day',
    meals: [
      { time: 'Breakfast (7–8 AM)', items: ['Oats with full-fat milk & banana', '3 whole eggs (boiled/omelette)', '2 slices brown bread with peanut butter'] },
      { time: 'Mid-Morning (10 AM)', items: ['Handful of mixed nuts & dry fruits', '1 glass whole milk or protein shake'] },
      { time: 'Lunch (1–2 PM)', items: ['2 cups rice + dal', 'Chicken breast / Paneer (200g)', 'Salad with olive oil dressing', '1 cup curd'] },
      { time: 'Evening (4–5 PM)', items: ['Peanut butter & banana smoothie', 'Roasted chana'] },
      { time: 'Dinner (7–8 PM)', items: ['3 rotis + mixed vegetable sabzi', 'Dal makhani or rajma', '1 glass warm milk'] },
    ],
    tips: ['Eat every 3–4 hours', 'Strength training 4x/week', 'Sleep 7–8 hrs daily', 'Avoid junk calories']
  },
  normal: {
    label: 'Normal Weight', color: '#22c55e',
    goal: 'Maintain healthy weight & stay fit',
    calories: '2000 – 2400 kcal/day',
    meals: [
      { time: 'Breakfast (7–8 AM)', items: ['Vegetable poha or upma', '2 boiled eggs or sprouts', '1 cup green tea'] },
      { time: 'Mid-Morning (10 AM)', items: ['1 seasonal fruit (apple/guava/papaya)', 'Handful of almonds'] },
      { time: 'Lunch (1–2 PM)', items: ['1–2 cups rice or 2 rotis', 'Dal + sabzi', 'Grilled chicken or tofu (150g)', 'Salad & buttermilk'] },
      { time: 'Evening (4–5 PM)', items: ['1 cup green tea', 'Roasted makhana or chana'] },
      { time: 'Dinner (7–8 PM)', items: ['2 rotis + dal / sabzi', 'Soup or light chicken curry', '15 min walk after dinner'] },
    ],
    tips: ['Drink 3L water daily', 'Exercise 4–5x/week', 'Limit sugar & processed food', 'Track meals weekly']
  },
  overweight: {
    label: 'Overweight', color: '#f97316',
    goal: 'Lose excess fat & improve fitness',
    calories: '1500 – 1800 kcal/day',
    meals: [
      { time: 'Breakfast (7–8 AM)', items: ['Vegetable omelette (2 eggs)', 'Multigrain toast (1 slice)', '1 cup green tea (no sugar)'] },
      { time: 'Mid-Morning (10 AM)', items: ['1 fruit (apple/pear/guava)', '5–6 almonds or walnuts'] },
      { time: 'Lunch (1–2 PM)', items: ['2 rotis (wheat) + dal', 'Grilled chicken / fish / paneer (100g)', 'Large salad', 'Avoid rice & maida'] },
      { time: 'Evening (4–5 PM)', items: ['Green tea or black coffee', 'Roasted chana (small bowl)'] },
      { time: 'Dinner (7–8 PM)', items: ['1–2 rotis + light sabzi / soup', 'Avoid carbs after 7 PM', 'Dinner before 8 PM'] },
    ],
    tips: ['Cardio 5x/week (30–45 min)', 'Drink water before meals', 'Avoid sugar, fried food, soda', 'Eat dinner early']
  },
  obese: {
    label: 'Obese', color: '#ef4444',
    goal: 'Significant fat loss under guidance',
    calories: '1200 – 1500 kcal/day',
    meals: [
      { time: 'Breakfast (7–8 AM)', items: ['2 egg whites scrambled', '1 slice multigrain bread', '1 cup green tea (no sugar)'] },
      { time: 'Mid-Morning (10 AM)', items: ['1 small fruit (apple/pear)', 'Warm lemon water'] },
      { time: 'Lunch (1–2 PM)', items: ['1 roti + bowl of dal', 'Grilled chicken or fish (100g)', 'Steamed vegetables', 'NO rice, maida or fried items'] },
      { time: 'Evening (4–5 PM)', items: ['Herbal / green tea', 'Cucumber or carrot sticks'] },
      { time: 'Dinner (7–8 PM)', items: ['Vegetable soup (no cream)', '1 roti + stir-fried vegetables', 'Dinner before 7:30 PM strictly'] },
    ],
    tips: ['Consult a doctor before dieting', 'Start with walking 20 min/day', 'Zero alcohol & sugary drinks', 'Weigh yourself weekly']
  }
};

function getBMICategory(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

function calculateBMI() {
  const name = document.getElementById('bmiName').value.trim();
  const height = parseFloat(document.getElementById('bmiHeight').value);
  const weight = parseFloat(document.getElementById('bmiWeight').value);
  if (!name || !height || !weight) { alert('Please fill all fields!'); return; }

  const hm = height / 100;
  const bmi = (weight / (hm * hm)).toFixed(1);
  const cat = getBMICategory(parseFloat(bmi));
  const plan = dietPlans[cat];

  // Score
  document.getElementById('bmiNum').textContent = bmi;
  document.getElementById('bmiNum').style.color = plan.color;
  document.getElementById('bmiCat').textContent = plan.label;
  document.getElementById('bmiCat').style.background = plan.color;

  // Gauge
  const pct = ((Math.min(Math.max(parseFloat(bmi), 10), 40) - 10) / 30) * 100;
  document.getElementById('gaugeNeedle').style.left = pct + '%';

  // Diet chart meta
  document.getElementById('dcMeta').innerHTML = `<strong>Name:</strong> ${name}<br/><strong>BMI:</strong> ${bmi}<br/><strong>Category:</strong> <span style="color:${plan.color}">${plan.label}</span><br/><strong>Daily Target:</strong> ${plan.calories}`;
  document.getElementById('dcGoal').textContent = 'Goal: ' + plan.goal;

  // Meals
  let mealsHtml = '';
  plan.meals.forEach(m => {
    mealsHtml += `<div class="dc-meal-row"><div class="dc-meal-time" style="border-right-color:${plan.color}">${m.time}</div><div class="dc-meal-items">${m.items.map(i => `<span>✓ ${i}</span>`).join('')}</div></div>`;
  });
  document.getElementById('dcMeals').innerHTML = mealsHtml;

  // Tips
  document.getElementById('dcTips').innerHTML = `<div class="dc-tips"><h4 style="color:${plan.color}">Key Tips</h4><div class="dc-tips-grid">${plan.tips.map(t => `<div class="dc-tip">${t}</div>`).join('')}</div></div>`;

  document.getElementById('bmiResult').style.display = 'block';
  document.getElementById('bmiResult').scrollIntoView({ behavior: 'smooth' });
}

async function downloadChart() {
  const { default: html2canvas } = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js');
  const { jsPDF } = await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.esm.js');
  const name = document.getElementById('bmiName').value.trim() || 'Member';
  const chart = document.getElementById('dietChart');
  const canvas = await html2canvas(chart, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
  const pdf = new jsPDF({ unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
  pdf.save(`${name.replace(/\s+/g,'_')}_Diet_Chart.pdf`);
}

// WhatsApp form
function sendWA(e) {
  e.preventDefault();
  const name = document.getElementById('cfName').value;
  const phone = document.getElementById('cfPhone').value;
  const email = document.getElementById('cfEmail').value;
  const plan = document.getElementById('cfPlan').value;
  const msg = document.getElementById('cfMsg').value;
  const text = encodeURIComponent(`🏋️ *New Enquiry - AB Fitness Club*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}${email ? `\n📧 *Email:* ${email}` : ''}${plan ? `\n💪 *Interested In:* ${plan}` : ''}${msg ? `\n💬 *Message:* ${msg}` : ''}`);
  window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, '_blank');
}
