/**
 * CEREBRUM & CO. - Products Catalog & Difficulty Filtering Engine
 * Vanilla JavaScript Implementation
 */

(function () {
  'use strict';

  const PRODUCTS_DATA = [
    {
      id: 'puzzle-easy-01',
      name: 'Soma Geometric Wooden Cube 3D',
      difficulty: 'Easy',
      levelNumber: 2,
      price: 34.00,
      image: 'https://i.pinimg.com/736x/b5/98/a4/b598a4446f58cc19aeef0797f751a67f.jpg',
      category: 'Wooden Teaser',
      material: 'Sustainably Harvested Beech Wood',
      pieces: 7,
      solveTimeAvg: '15 - 30 minutes',
      rating: 4.8,
      reviewsCount: 142,
      description: 'The definitive introduction to spatial reasoning. Comprising seven distinct polycube pieces that assemble into a monolithic 3x3x3 solid cube.'
    },
    {
      id: 'puzzle-easy-02',
      name: 'Pyraminx Speed Tetra Core',
      difficulty: 'Easy',
      levelNumber: 3,
      price: 28.50,
      image: 'https://i.pinimg.com/1200x/31/b7/81/31b781d8dd7c57b2e33816d8184ce1dc.jpg',
      category: 'Twisty Polyhedron',
      material: 'Aerospace-Grade ABS with Magnetic Positioning',
      pieces: 4,
      solveTimeAvg: '10 - 20 minutes',
      rating: 4.9,
      reviewsCount: 210,
      description: 'Engineered for smooth rotational agility. Magnetic corner positioning provides tactile feedback for ergonomic competition-grade solving.'
    },
    {
      id: 'puzzle-easy-03',
      name: 'Tangram Master Architectural Mosaic',
      difficulty: 'Easy',
      levelNumber: 2,
      price: 39.00,
      image: 'https://i.pinimg.com/1200x/61/1f/52/611f529ace6b6e8f10511ad32b166238.jpg',
      category: 'Geometric Dissection',
      material: 'Laser-Cut Hard Maple & Black Walnut',
      pieces: 7,
      solveTimeAvg: '20 minutes',
      rating: 4.7,
      reviewsCount: 88,
      description: 'A timeless dissection puzzle featuring centuries-old silhouette challenges accompanied by a leather-bound folio of 150 historical geometry paradoxes.'
    },
    {
      id: 'puzzle-med-01',
      name: 'Vortex Cast Zinc Disentanglement',
      difficulty: 'Medium',
      levelNumber: 5,
      price: 46.00,
      image: 'https://i.pinimg.com/1200x/31/1d/d5/311dd5a57746ad4e45eb81af7170e933.jpg',
      category: 'Cast Metal Burr',
      material: 'Die-Cast Zinc Alloy with Matte Gunmetal Finish',
      pieces: 3,
      solveTimeAvg: '1.5 - 3 hours',
      rating: 4.9,
      reviewsCount: 320,
      description: 'Three intermeshed curved spiral helical components that slide in synchronized harmony. Requires rotational counter-intuition to unbind.'
    },
    {
      id: 'puzzle-med-02',
      name: 'Leonardo Da Vinci Cryptex Cipher Vault',
      difficulty: 'Medium',
      levelNumber: 6,
      price: 78.00,
      image: 'https://i.pinimg.com/736x/bb/38/b6/bb38b6579e78d95f542cd862922cae53.jpg',
      category: 'Sequential Discovery',
      material: 'Solid Antiqued Brass & Mechanical Tumblers',
      pieces: 1,
      solveTimeAvg: '2 - 4 hours',
      rating: 4.8,
      reviewsCount: 195,
      description: 'A functioning six-letter tumbler chamber mechanism that protects a hidden internal compartment. Includes customization pins to re-key passwords.'
    },
    {
      id: 'puzzle-med-03',
      name: 'Perplexus 3D Gravitational Labyrinth',
      difficulty: 'Medium',
      levelNumber: 5,
      price: 52.00,
      image: 'https://i.pinimg.com/1200x/4f/c1/47/4fc147847345668124596c62814989ae.jpg',
      category: 'Dexterity & Balance',
      material: 'Shatter-Proof Polycarbonate Sphere',
      pieces: 1,
      solveTimeAvg: '45 - 90 minutes',
      rating: 4.7,
      reviewsCount: 112,
      description: 'Navigate a micro steel sphere through 125 numbered checkpoints along inverted tracks, spirals, and gravity-defying hairpins inside a clear globe.'
    },
    {
      id: 'puzzle-hard-01',
      name: 'Hanayama Cast Enigma Key Complex',
      difficulty: 'Hard',
      levelNumber: 8,
      price: 58.00,
      image: 'https://i.pinimg.com/236x/54/40/9b/54409b1d02855298cec7bff97debd089.jpg',
      category: 'Cast Metal Burr',
      material: 'Heavyweight Solid Die-Cast Metal Alloy',
      pieces: 3,
      solveTimeAvg: '4 - 8 hours',
      rating: 5.0,
      reviewsCount: 420,
      description: 'Patented by Eldon Vaughn. Widely regarded by puzzle scholars as one of the most intellectually bewildering disentanglement cast teasers ever devised.'
    },
    {
      id: 'puzzle-hard-02',
      name: 'Karakuri 72-Step Secret Hakone Box',
      difficulty: 'Hard',
      levelNumber: 7,
      price: 185.00,
      image: 'https://i.pinimg.com/1200x/2e/c2/73/2ec2730a5340614ae4390d16a92df999.jpg',
      category: 'Sequential Trick Box',
      material: 'Traditional Yosegi-Zaiku Inlaid Hardwoods',
      pieces: 1,
      solveTimeAvg: '3 - 6 hours',
      rating: 4.9,
      reviewsCount: 164,
      description: 'Handcrafted in Hakone, Japan. Requires exactly 72 precise, non-intuitive slide steps in consecutive order to release the hidden heirloom tray.'
    },
    {
      id: 'puzzle-hard-03',
      name: 'Gigaminx 12-Sided Dodecahedral Titan',
      difficulty: 'Hard',
      levelNumber: 8,
      price: 92.00,
      image: 'https://i.pinimg.com/1200x/db/37/e7/db37e70723b1ee0fb05a1aaa4b8709d5.jpg',
      category: 'Twisty Polyhedron',
      material: 'Fluoropolymer Lubricated Nylon & ABS',
      pieces: 12,
      solveTimeAvg: '5 - 10 hours',
      rating: 4.8,
      reviewsCount: 88,
      description: 'A 5-layered 12-faced dodecahedron with hundreds of independently rotating segments. Designed for seasoned cubers looking for extreme permutations.'
    },
    {
      id: 'puzzle-master-01',
      name: 'Revomaze V1 Extreme Brass Blind Maze',
      difficulty: 'Master',
      levelNumber: 10,
      price: 245.00,
      image: 'https://i.pinimg.com/1200x/d6/ba/e2/d6bae2a09add05f8f9fe27493bc0199e.jpg',
      category: 'Blind Mechanical Labyrinth',
      material: 'Aircraft Aluminum Sleeve & Precision Brass Shaft',
      pieces: 1,
      solveTimeAvg: '25 - 60 hours',
      rating: 5.0,
      reviewsCount: 94,
      description: 'A precision-milled internal maze solved entirely by touch, sound, and mental mapping. Features deceptive false paths and internal gravity traps.'
    },
    {
      id: 'puzzle-master-02',
      name: 'Isis Sequential Discovery Sphere',
      difficulty: 'Master',
      levelNumber: 9,
      price: 210.00,
      image: 'https://i.pinimg.com/1200x/a5/20/f0/a520f0ea5a10cac3ae4a2ba01998a98e.jpg',
      category: 'Mechanical Sequential Lock',
      material: 'Anodized Aircraft Aluminum & Stainless Steel Core',
      pieces: 1,
      solveTimeAvg: '15 - 35 hours',
      rating: 4.9,
      reviewsCount: 130,
      description: 'Cryptic symbols etched upon rotating alloy dials. Solvers must decipher hidden internal sound cues and internal weighted ball bearings to unlock.'
    },
    {
      id: 'puzzle-master-03',
      name: 'Infinity Burr 24-Piece Interlocking Core',
      difficulty: 'Master',
      levelNumber: 10,
      price: 260.00,
      image: 'https://i.pinimg.com/1200x/04/be/d8/04bed8ec1f2558261a273cecf27464e9.jpg',
      category: 'Interlocking Burr',
      material: 'Solid Brass & Aerospace Bronze Machined Billets',
      pieces: 24,
      solveTimeAvg: '30+ hours',
      rating: 5.0,
      reviewsCount: 62,
      description: 'Designed by mathematical topologists. Exactly one singular sequential path exists to dismantle the 24 interlocking geometric notched bars.'
    }
  ];

  let currentFilter = 'All';
  let currentSort = 'featured';
  let searchQuery = '';

  function getBadgeClass(difficulty) {
    switch (difficulty) {
      case 'Easy': return 'badge-easy';
      case 'Medium': return 'badge-medium';
      case 'Hard': return 'badge-hard';
      case 'Master': return 'badge-master';
      default: return 'badge-medium';
    }
  }

  function renderGrid() {
    const grid = document.getElementById('products-grid');
    const countElem = document.getElementById('products-count');
    if (!grid) return;

    // Filter
    let filtered = PRODUCTS_DATA.filter(item => {
      const matchDiff = currentFilter === 'All' || item.difficulty === currentFilter;
      const matchSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDiff && matchSearch;
    });

    // Sort
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'difficulty') {
      filtered.sort((a, b) => a.levelNumber - b.levelNumber);
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (countElem) {
      countElem.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} Specialty Puzzles`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 p-8">
          <svg class="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">No Specialty Puzzles Found</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">No challenges match your current filter parameters. Try clearing your search keyword or switching difficulty level.</p>
          <button id="reset-filters-btn" class="btn-primary">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentFilter = 'All';
          searchQuery = '';
          const searchInput = document.getElementById('product-search-input');
          if (searchInput) searchInput.value = '';
          updateFilterButtons();
          renderGrid();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="flat-card flex flex-col justify-between group overflow-hidden h-full" data-difficulty="${item.difficulty}">
        <div>
          <div class="relative overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div class="absolute top-3 left-3 flex flex-col gap-1 items-start">
              <span class="${getBadgeClass(item.difficulty)}">${item.difficulty} Tier (Lvl ${item.levelNumber})</span>
            </div>
            <div class="absolute top-3 right-3 bg-slate-900 text-white dark:bg-slate-950 text-xs font-bold px-2 py-1 border border-slate-700">
              ${item.pieces} ${item.pieces === 1 ? 'Chamber' : 'Parts'}
            </div>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span class="uppercase tracking-wider font-semibold">${item.category}</span>
              <span class="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                ★ ${item.rating} <span class="font-normal text-slate-400">(${item.reviewsCount})</span>
              </span>
            </div>
            <h3 class="text-base sm:text-lg font-bold mb-2 leading-snug line-clamp-2 min-h-[3rem] group-hover:text-amber-600 transition-colors">
              ${item.name}
            </h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[2.5rem] mb-4 leading-relaxed">
              ${item.description}
            </p>
            <div class="flex items-center justify-between text-xs py-2 px-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-2">
              <span class="text-slate-500 dark:text-slate-400">Avg Solve:</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">${item.solveTimeAvg}</span>
            </div>
          </div>
        </div>
        <div class="px-5 py-3 border-t border-slate-100 dark:border-slate-800 mt-auto bg-slate-50/50 dark:bg-slate-900/30">
          <div class="flex items-center justify-between gap-2">
            <div class="flex flex-col">
              <span class="text-[11px] text-slate-400">Collector Price</span>
              <span class="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">$${item.price.toFixed(2)}</span>
            </div>
            <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <button 
                onclick="window.openQuickView('${item.id}')"
                class="btn-secondary !py-1.5 sm:!py-2 !px-2.5 sm:!px-3 text-xs whitespace-nowrap"
                title="View Puzzle Specifications">
                Specs
              </button>
              <button 
                onclick="window.addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.image}', '${item.difficulty}')"
                class="btn-primary !py-1.5 sm:!py-2 !px-2.5 sm:!px-3 text-xs whitespace-nowrap"
                title="Add to puzzle trunk">
                Add
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  function updateFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      const filterVal = btn.getAttribute('data-filter');
      if (filterVal === currentFilter) {
        btn.classList.add('bg-slate-900', 'text-white', 'dark:bg-amber-500', 'dark:text-slate-950', 'border-slate-900', 'dark:border-amber-500');
        btn.classList.remove('bg-transparent', 'text-slate-700', 'dark:text-slate-300');
      } else {
        btn.classList.remove('bg-slate-900', 'text-white', 'dark:bg-amber-500', 'dark:text-slate-950', 'border-slate-900', 'dark:border-amber-500');
        btn.classList.add('bg-transparent', 'text-slate-700', 'dark:text-slate-300');
      }
    });
  }

  window.openQuickView = function (productId) {
    const item = PRODUCTS_DATA.find(p => p.id === productId);
    if (!item) return;

    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('quick-view-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <img src="${item.image}" alt="${item.name}" class="w-full aspect-square object-cover border border-slate-200 dark:border-slate-700" />
          <div class="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Material: ${item.material}</span>
            <span class="font-bold">${item.pieces} Components</span>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="${getBadgeClass(item.difficulty)}">${item.difficulty} Tier</span>
              <span class="text-xs text-slate-400">Level ${item.levelNumber} / 10</span>
            </div>
            <h3 class="text-2xl font-bold mb-3">${item.name}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">${item.description}</p>
            <div class="space-y-2 py-3 border-y border-slate-200 dark:border-slate-800 text-xs">
              <div class="flex justify-between"><span class="text-slate-500">Category:</span><span class="font-bold text-slate-800 dark:text-slate-200">${item.category}</span></div>
              <div class="flex justify-between"><span class="text-slate-500">Expected Solve Time:</span><span class="font-bold text-slate-800 dark:text-slate-200">${item.solveTimeAvg}</span></div>
              <div class="flex justify-between"><span class="text-slate-500">Precision Tolerance:</span><span class="font-bold text-slate-800 dark:text-slate-200">±0.02 mm CNC Tolerance</span></div>
              <div class="flex justify-between"><span class="text-slate-500">Mensa Rating:</span><span class="font-bold text-slate-800 dark:text-slate-200">Top Tier Logic Approved</span></div>
            </div>
          </div>
          <div class="pt-6 flex items-center justify-between">
            <span class="text-2xl font-bold text-slate-900 dark:text-slate-100">$${item.price.toFixed(2)}</span>
            <button 
              onclick="window.addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.image}', '${item.difficulty}'); document.getElementById('quick-view-modal').classList.add('hidden'); document.body.classList.remove('overflow-hidden');"
              class="btn-primary">
              Add To Puzzle Trunk
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  function initProductPage() {
    // Difficulty tab filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.getAttribute('data-filter');
        updateFilterButtons();
        renderGrid();
      });
    });

    // Search input
    const searchInput = document.getElementById('product-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderGrid();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('product-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGrid();
      });
    }

    // Quick View Modal Close
    const qvModal = document.getElementById('quick-view-modal');
    const qvClose = document.getElementById('quick-view-close');
    if (qvModal) {
      if (qvClose) {
        qvClose.addEventListener('click', () => {
          qvModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        });
      }
      qvModal.addEventListener('click', (e) => {
        if (e.target === qvModal) {
          qvModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      });
    }

    updateFilterButtons();
    renderGrid();
  }

  document.addEventListener('DOMContentLoaded', initProductPage);

})();
