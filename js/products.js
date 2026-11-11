/**
 * CEREBRUM & CO. - Products Catalog & Multi-Faceted Organization Engine
 * Organizes puzzles by Age Group, Difficulty Level, Piece Count, Material, and Estimated Solving Time.
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
      image: 'https://imgs.search.brave.com/bP2cB06TQkrNr8S9bYckDKPY9pPHonMjVHzMaE9Fd1Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFnTzg1YS1DUkwu/anBn',
      category: 'Wooden Teaser',
      ageGroup: 'Ages 8+',
      ageMin: 8,
      pieces: 7,
      pieceCategory: '6-12',
      material: 'Sustainably Harvested Beech Wood',
      materialCategory: 'wood',
      materialShort: 'Beech Wood',
      solveTimeAvg: '15 - 30 minutes',
      solveTimeCategory: 'quick',
      solveTimeMinutesMin: 15,
      rating: 4.8,
      reviewsCount: 142,
      description: 'The definitive introduction to spatial reasoning. Comprising seven distinct polycube pieces that assemble into a monolithic 3x3x3 solid cube.'
    },
    {
      id: 'puzzle-easy-02',
      name: 'Pyraminx Speed Tetra Core Cone',
      difficulty: 'Easy',
      levelNumber: 3,
      price: 28.50,
      image: 'https://imgs.search.brave.com/SlrbQ0RnChyMH6QEPSAVeBBVVRjY-pOeHaOPMmSelYo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtZXUuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzQxcFpWYzlEUDBM/LmpwZw',
      category: 'Twisty Polyhedron',
      ageGroup: 'Ages 8+',
      ageMin: 8,
      pieces: 4,
      pieceCategory: '2-5',
      material: 'Aerospace-Grade ABS with Magnetic Positioning',
      materialCategory: 'polymer',
      materialShort: 'Magnetic ABS',
      solveTimeAvg: '10 - 20 minutes',
      solveTimeCategory: 'quick',
      solveTimeMinutesMin: 10,
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
      image: 'https://imgs.search.brave.com/Txi_5CUBIfRA7XUdgxQqYmyzIHwYb7d0EC28Blm_y2Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzE3MTUyMzcyL3Iv/aWwvNDNlYTVlLzcz/MTkxNTc1MTEvaWxf/Nzk0eE4uNzMxOTE1/NzUxMV9xanNrLmpw/Zw',
      category: 'Geometric Dissection',
      ageGroup: 'Ages 8+',
      ageMin: 8,
      pieces: 7,
      pieceCategory: '6-12',
      material: 'Laser-Cut Hard Maple & Black Walnut',
      materialCategory: 'wood',
      materialShort: 'Maple & Walnut',
      solveTimeAvg: '20 minutes',
      solveTimeCategory: 'quick',
      solveTimeMinutesMin: 20,
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
      image: 'https://imgs.search.brave.com/gEOovsxRjdIEtMo5ODNeVYRlfV8PbgzKYarH5fEdop0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzUyMTkwNzkvci9p/bC9kY2VmNzkvNDM1/MDMxMDY5Mi9pbF83/OTR4Ti40MzUwMzEw/NjkyX3I5OW4uanBn',
      category: 'Cast Metal Burr',
      ageGroup: 'Ages 12+',
      ageMin: 12,
      pieces: 3,
      pieceCategory: '2-5',
      material: 'Die-Cast Zinc Alloy with Matte Gunmetal Finish',
      materialCategory: 'zinc',
      materialShort: 'Cast Zinc Alloy',
      solveTimeAvg: '1.5 - 3 hours',
      solveTimeCategory: 'moderate',
      solveTimeMinutesMin: 90,
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
      image: 'https://imgs.search.brave.com/pesYff0NvOVQt6E83hDqCUYRIOVZLcq64sS-gQIUaNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/aW1hZ28uY3ovaGxh/dm9sYW0ta3J5cHRl/eC1zaWZyYS1taXN0/cmEtbGVvbmFyZGEt/NmEwNWY0NmUwYjc4/Mi9obGF2b2xhbS1r/cnlwdGV4LXNpZnJh/LW1pc3RyYS1sZW9u/YXJkYS02YTA1ZjQ2/ZTBiNzgyLTEwMDB4/MTAwMC53ZWJw',
      category: 'Sequential Discovery',
      ageGroup: 'Ages 12+',
      ageMin: 12,
      pieces: 1,
      pieceCategory: 'single',
      material: 'Solid Antiqued Brass & Mechanical Tumblers',
      materialCategory: 'brass',
      materialShort: 'Antiqued Brass',
      solveTimeAvg: '2 - 4 hours',
      solveTimeCategory: 'moderate',
      solveTimeMinutesMin: 120,
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
      image: 'https://imgs.search.brave.com/FHv8TosOnqewUsEAEkgFsigr_AYyK-k3gc4CLkiyOao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaG9w/LnNwaW5tYXN0ZXIu/Y29tL2Nkbi9zaG9w/L2ZpbGVzL253eGpt/M2Qxb3JlbnJmaGdq/aGNsXzgwMHguanBn/P3Y9MTcyOTI4NDEz/OQ',
      category: 'Dexterity & Balance',
      ageGroup: 'Ages 10+',
      ageMin: 10,
      pieces: 1,
      pieceCategory: 'single',
      material: 'Shatter-Proof Polycarbonate Sphere',
      materialCategory: 'polymer',
      materialShort: 'Polycarbonate',
      solveTimeAvg: '45 - 90 minutes',
      solveTimeCategory: 'moderate',
      solveTimeMinutesMin: 45,
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
      image: 'https://m.media-amazon.com/images/I/71SUlGkDyTL._AC_SX679_.jpg',
      category: 'Cast Metal Burr',
      ageGroup: 'Ages 14+',
      ageMin: 14,
      pieces: 3,
      pieceCategory: '2-5',
      material: 'Heavyweight Solid Die-Cast Metal Alloy',
      materialCategory: 'zinc',
      materialShort: 'Die-Cast Alloy',
      solveTimeAvg: '4 - 8 hours',
      solveTimeCategory: 'extended',
      solveTimeMinutesMin: 240,
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
      image: 'https://imgs.search.brave.com/rXib_qGsTpE1t0eC_fC_GBgR2Bnh1d7BYfdrgAN6JdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oYWtv/bmUta2FyYWt1cmku/anAvd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDQvaDcyMDZf/MS5qcGc',
      category: 'Sequential Trick Box',
      ageGroup: 'Ages 14+',
      ageMin: 14,
      pieces: 1,
      pieceCategory: 'single',
      material: 'Traditional Yosegi-Zaiku Inlaid Hardwoods',
      materialCategory: 'wood',
      materialShort: 'Yosegi Hardwoods',
      solveTimeAvg: '3 - 6 hours',
      solveTimeCategory: 'extended',
      solveTimeMinutesMin: 180,
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
      image: 'https://imgs.search.brave.com/_whilG7A6gWiFXTAk4jpnzNd6VRKO4LYApnEsyVUzxM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzUxUEhQWkc4TFFM/LmpwZw',
      category: 'Twisty Polyhedron',
      ageGroup: 'Ages 14+',
      ageMin: 14,
      pieces: 12,
      pieceCategory: '6-12',
      material: 'Fluoropolymer Lubricated Nylon & ABS',
      materialCategory: 'polymer',
      materialShort: 'Lubricated ABS',
      solveTimeAvg: '5 - 10 hours',
      solveTimeCategory: 'extended',
      solveTimeMinutesMin: 300,
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
      image: 'https://imgs.search.brave.com/eO4nH68IvJWbCLf5gWn4qF_zXsSi6sh5kbgu9DbT1B0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYi9SMjl2/WjJ4bC9BVnZYc0Vn/azY2Rml4enhBX29E/aWhSSExLR3RaUUNk/d05xUk5UOW5zR0FS/ZHp0N3JxaWlwcnJp/Nk9LdXRYMlRmNmpD/RzFVdDNJZ2VFWWdn/OHZjTDVSMnQ3XzNU/UlNra3pwTkg2cGdD/LUNPdl9qeWRSb0lI/bkN0cmJKUnkxLUZs/T0QzbjZZVDBTZjF3/d19iMEZHcGh3L3M0/MDAvRFNDXzQ3ODBf/ZWRpdGVkLTEuanBn',
      category: 'Blind Mechanical Labyrinth',
      ageGroup: 'Ages 18+',
      ageMin: 18,
      pieces: 1,
      pieceCategory: 'single',
      material: 'Aircraft Aluminum Sleeve & Precision Brass Shaft',
      materialCategory: 'brass',
      materialShort: 'Brass & Aluminum',
      solveTimeAvg: '25 - 60 hours',
      solveTimeCategory: 'endurance',
      solveTimeMinutesMin: 1500,
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
      image: 'https://imgs.search.brave.com/3UccJo6T3m_tgrUuzhMq_0kr43pzCucr83O8xbf2D4g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL3Q2Y0FB/ZVN3bG5Kb055WDcv/cy1sMTYwMC5qcGc',
      category: 'Mech Sequential Lock',
      ageGroup: 'Ages 16+',
      ageMin: 16,
      pieces: 1,
      pieceCategory: 'single',
      material: 'Anodized Aircraft Aluminum & Stainless Steel Core',
      materialCategory: 'zinc',
      materialShort: 'Aircraft Aluminum',
      solveTimeAvg: '15 - 35 hours',
      solveTimeCategory: 'endurance',
      solveTimeMinutesMin: 900,
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
      image: 'https://imgs.search.brave.com/oWy_JGg7l5jAnq8pQL-Ehlz--xblocF35DDO4lvu0tM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lYXN5/dG90LmNvbS9jZG4v/c2hvcC9maWxlcy8y/NC1waWVjZS1pbnRl/cmxvY2tpbmctd29v/ZGVuLWhhbmRtYWRl/LXB1enpsZS1icm9v/a2x5bi5qcGc_dj0x/NzY4NjEzNDA5Jndp/ZHRoPTE1MDA',
      category: 'Interlocking Burr',
      ageGroup: 'Ages 18+',
      ageMin: 18,
      pieces: 24,
      pieceCategory: '20+',
      material: 'Solid Brass & Aerospace Bronze Machined Billets',
      materialCategory: 'brass',
      materialShort: 'Brass & Bronze',
      solveTimeAvg: '30+ hours',
      solveTimeCategory: 'endurance',
      solveTimeMinutesMin: 1800,
      rating: 5.0,
      reviewsCount: 62,
      description: 'Designed by mathematical topologists. Exactly one singular sequential path exists to dismantle the 24 interlocking geometric notched bars.'
    }
  ];

  // Active Filter & Sort State
  let currentDifficulty = 'All';
  let currentAge = 'all';
  let currentPieces = 'all';
  let currentMaterial = 'all';
  let currentTime = 'all';
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

  function renderCardHtml(item) {
    return `
      <article class="flat-card flex flex-col justify-between group overflow-hidden h-full" data-difficulty="${item.difficulty}">
        <div>
          <!-- Image Container with Difficulty + Age + Pieces Badges -->
          <div class="relative overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800 border-b border-theme">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <!-- Top Left: Difficulty & Age Badges -->
            <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap z-10">
              <span class="${getBadgeClass(item.difficulty)} text-[10px] font-black uppercase tracking-wider px-2 py-0.5">${item.difficulty} (Lvl ${item.levelNumber})</span>
              <span class="badge-age text-[10px] font-black uppercase tracking-wider px-2 py-0.5">${item.ageGroup}</span>
            </div>
            <!-- Top Right: Piece Count Badge (High Contrast in Light and Dark Mode) -->
            <span class="badge-pieces absolute top-2.5 right-2.5">
              ${item.pieces} ${item.pieces === 1 ? 'Chamber' : 'Parts'}
            </span>
          </div>

          <!-- Card Content Body -->
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center justify-between text-xs text-slate-950 dark:text-white mb-2">
              <span class="uppercase tracking-wider font-black text-slate-950 dark:text-white">${item.category}</span>
              <span class="flex items-center gap-1 font-black text-amber-600 dark:text-amber-400">
                ★ ${item.rating} <span class="font-extrabold text-slate-950 dark:text-white">(${item.reviewsCount})</span>
              </span>
            </div>

            <h3 class="text-base font-black mb-1.5 leading-snug line-clamp-1 group-hover:text-amber-600 transition-colors text-slate-950 dark:text-white" title="${item.name}">
              ${item.name}
            </h3>

            <p class="text-xs text-slate-950 dark:text-white font-semibold line-clamp-2 mb-3 leading-relaxed">
              ${item.description}
            </p>

            <!-- Clean Specifications Grid: Age, Time, Material, Pieces -->
            <div class="grid grid-cols-2 gap-x-2 gap-y-1.5 py-2 px-2.5 bg-slate-50 dark:bg-slate-900/60 border border-theme text-[11px] mb-3">
              <div>
                <span class="text-slate-700 dark:text-slate-300 font-extrabold block text-[10px] uppercase tracking-wider">Age Group</span>
                <span class="font-black text-slate-950 dark:text-white">${item.ageGroup}</span>
              </div>
              <div>
                <span class="text-slate-700 dark:text-slate-300 font-extrabold block text-[10px] uppercase tracking-wider">Est. Solve Time</span>
                <span class="font-black text-slate-950 dark:text-white">${item.solveTimeAvg}</span>
              </div>
              <div>
                <span class="text-slate-700 dark:text-slate-300 font-extrabold block text-[10px] uppercase tracking-wider">Material</span>
                <span class="font-black text-slate-950 dark:text-white truncate block" title="${item.material}">${item.materialShort}</span>
              </div>
              <div>
                <span class="text-slate-700 dark:text-slate-300 font-extrabold block text-[10px] uppercase tracking-wider">Piece Count</span>
                <span class="font-black text-slate-950 dark:text-white">${item.pieces} ${item.pieces === 1 ? 'Chamber' : 'Parts'}</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Card Footer Action Bar -->
        <div class="px-5 py-3 border-t border-theme mt-auto bg-slate-50/50 dark:bg-slate-900/30">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xl font-black text-slate-950 dark:text-white">$${item.price.toFixed(2)}</span>
            <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <button 
                onclick="window.openQuickView('${item.id}')"
                class="btn-secondary !py-1.5 sm:!py-2 !px-2.5 sm:!px-3 text-xs whitespace-nowrap"
                title="View Full Specifications">
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
    `;
  }

  function renderGrid() {
    const grid = document.getElementById('products-grid');
    const countElem = document.getElementById('products-count');
    const clearBtn = document.getElementById('clear-all-filters-btn');
    const chipsContainer = document.getElementById('active-filter-chips');
    if (!grid) return;

    // Filter across all 5 dimensions simultaneously
    let filtered = PRODUCTS_DATA.filter(item => {
      // 1. Difficulty Tier
      const matchDiff = currentDifficulty === 'All' || item.difficulty === currentDifficulty;

      // 2. Age Group
      let matchAge = true;
      if (currentAge !== 'all') {
        if (currentAge === '8') matchAge = item.ageMin <= 8;
        else if (currentAge === '10') matchAge = item.ageMin <= 10;
        else if (currentAge === '12') matchAge = item.ageMin >= 12;
        else if (currentAge === '14') matchAge = item.ageMin >= 14;
        else if (currentAge === '16') matchAge = item.ageMin >= 16;
        else if (currentAge === '18') matchAge = item.ageMin >= 18;
      }

      // 3. Piece Count
      let matchPieces = true;
      if (currentPieces !== 'all') {
        if (currentPieces === 'single') matchPieces = item.pieces === 1;
        else if (currentPieces === '2-5') matchPieces = item.pieces >= 2 && item.pieces <= 5;
        else if (currentPieces === '6-12') matchPieces = item.pieces >= 6 && item.pieces <= 12;
        else if (currentPieces === '20+') matchPieces = item.pieces >= 20;
      }

      // 4. Material
      let matchMaterial = true;
      if (currentMaterial !== 'all') {
        matchMaterial = item.materialCategory === currentMaterial;
      }

      // 5. Estimated Solving Time
      let matchTime = true;
      if (currentTime !== 'all') {
        matchTime = item.solveTimeCategory === currentTime;
      }

      // Search Query
      const matchSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ageGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solveTimeAvg.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDiff && matchAge && matchPieces && matchMaterial && matchTime && matchSearch;
    });

    // Sort
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'difficulty') {
      filtered.sort((a, b) => a.levelNumber - b.levelNumber);
    } else if (currentSort === 'difficulty-high') {
      filtered.sort((a, b) => b.levelNumber - a.levelNumber);
    } else if (currentSort === 'time-low') {
      filtered.sort((a, b) => a.solveTimeMinutesMin - b.solveTimeMinutesMin);
    } else if (currentSort === 'time-high') {
      filtered.sort((a, b) => b.solveTimeMinutesMin - a.solveTimeMinutesMin);
    } else if (currentSort === 'pieces-low') {
      filtered.sort((a, b) => a.pieces - b.pieces);
    } else if (currentSort === 'pieces-high') {
      filtered.sort((a, b) => b.pieces - a.pieces);
    } else if (currentSort === 'age-low') {
      filtered.sort((a, b) => a.ageMin - b.ageMin);
    } else if (currentSort === 'age-high') {
      filtered.sort((a, b) => b.ageMin - a.ageMin);
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Results Counter
    if (countElem) {
      countElem.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} Puzzles`;
    }

    // Active Filters Chips & Clear Button
    const isFiltered = currentDifficulty !== 'All' || currentAge !== 'all' || currentPieces !== 'all' || currentMaterial !== 'all' || currentTime !== 'all' || searchQuery !== '';
    if (clearBtn) {
      if (isFiltered) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
    }

    renderActiveChips(chipsContainer);

    // Empty State
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 bg-theme-secondary">
          <svg class="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <h3 class="text-xl font-black text-slate-950 dark:text-white mb-2">No Matching Puzzles Found</h3>
          <p class="text-sm text-slate-950 dark:text-white font-semibold max-w-md mx-auto mb-6">No challenges match your selected filters. Try broadening your criteria or reset filters.</p>
          <button id="reset-filters-btn" class="btn-primary">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters);
      }
      return;
    }

    // Solid, uninterrupted, fully responsive uniform grid
    grid.innerHTML = filtered.map(renderCardHtml).join('');
  }

  function renderActiveChips(container) {
    if (!container) return;
    const chips = [];

    if (currentDifficulty !== 'All') {
      chips.push({ label: `Tier: ${currentDifficulty}`, clear: () => { currentDifficulty = 'All'; syncFilterControls(); renderGrid(); } });
    }
    if (currentAge !== 'all') {
      const ageLabels = { '8': 'Ages 8+', '10': 'Ages 10+', '12': 'Ages 12+', '14': 'Ages 14+', '16': 'Ages 16+', '18': 'Ages 18+' };
      chips.push({ label: `Age: ${ageLabels[currentAge] || currentAge}`, clear: () => { currentAge = 'all'; syncFilterControls(); renderGrid(); } });
    }
    if (currentPieces !== 'all') {
      const pieceLabels = { 'single': '1 Piece', '2-5': '2–5 Pieces', '6-12': '6–12 Pieces', '20+': '20+ Pieces' };
      chips.push({ label: `Pieces: ${pieceLabels[currentPieces] || currentPieces}`, clear: () => { currentPieces = 'all'; syncFilterControls(); renderGrid(); } });
    }
    if (currentMaterial !== 'all') {
      const matLabels = { 'wood': 'Hardwood', 'zinc': 'Cast Zinc', 'brass': 'Brass & Bronze', 'polymer': 'Polymer' };
      chips.push({ label: `Material: ${matLabels[currentMaterial] || currentMaterial}`, clear: () => { currentMaterial = 'all'; syncFilterControls(); renderGrid(); } });
    }
    if (currentTime !== 'all') {
      const timeLabels = { 'quick': '< 30 Mins', 'moderate': '45m–3h', 'extended': '4–10h', 'endurance': '15–60h+' };
      chips.push({ label: `Time: ${timeLabels[currentTime] || currentTime}`, clear: () => { currentTime = 'all'; syncFilterControls(); renderGrid(); } });
    }
    if (searchQuery !== '') {
      chips.push({ label: `Search: "${searchQuery}"`, clear: () => { searchQuery = ''; const input = document.getElementById('product-search-input'); if (input) input.value = ''; renderGrid(); } });
    }

    if (chips.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = chips.map((c, idx) => `
      <span class="filter-chip" data-chip-idx="${idx}">
        <span>${c.label}</span>
        <span class="text-amber-600 font-black ml-1">&times;</span>
      </span>
    `).join('');

    // Attach listeners to chips
    container.querySelectorAll('.filter-chip').forEach((chipElem, idx) => {
      chipElem.addEventListener('click', () => {
        if (chips[idx]) chips[idx].clear();
      });
    });
  }

  function resetAllFilters() {
    currentDifficulty = 'All';
    currentAge = 'all';
    currentPieces = 'all';
    currentMaterial = 'all';
    currentTime = 'all';
    currentSort = 'featured';
    searchQuery = '';

    const searchInput = document.getElementById('product-search-input');
    if (searchInput) searchInput.value = '';

    syncFilterControls();
    renderGrid();
  }

  function syncFilterControls() {
    // 1. Difficulty Tab Buttons
    const tabButtons = document.querySelectorAll('.filter-tab-btn');
    tabButtons.forEach(btn => {
      const filterVal = btn.getAttribute('data-filter');
      if (filterVal === currentDifficulty) {
        btn.classList.add('bg-slate-900', 'text-white', 'dark:bg-amber-500', 'dark:text-slate-950', 'border-slate-900', 'dark:border-amber-500');
        btn.classList.remove('bg-theme-primary', 'text-slate-950', 'dark:text-white');
      } else {
        btn.classList.remove('bg-slate-900', 'text-white', 'dark:bg-amber-500', 'dark:text-slate-950', 'border-slate-900', 'dark:border-amber-500');
        btn.classList.add('bg-theme-primary', 'text-slate-950', 'dark:text-white');
      }
    });

    // 2. Selects
    const ageSelect = document.getElementById('filter-age-select');
    if (ageSelect) ageSelect.value = currentAge;

    const piecesSelect = document.getElementById('filter-pieces-select');
    if (piecesSelect) piecesSelect.value = currentPieces;

    const matSelect = document.getElementById('filter-material-select');
    if (matSelect) matSelect.value = currentMaterial;

    const timeSelect = document.getElementById('filter-time-select');
    if (timeSelect) timeSelect.value = currentTime;

    const sortSelect = document.getElementById('product-sort-select');
    if (sortSelect) sortSelect.value = currentSort;
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
          <img src="${item.image}" alt="${item.name}" class="w-full aspect-square object-cover border border-theme" />
          <div class="mt-3 flex items-center justify-between text-xs text-slate-950 dark:text-white font-bold">
            <span>Material: ${item.materialShort}</span>
            <span class="font-black text-slate-950 dark:text-white">${item.pieces} ${item.pieces === 1 ? 'Chamber' : 'Parts'}</span>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <div>
            <!-- Top Badges -->
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="${getBadgeClass(item.difficulty)}">${item.difficulty} Tier</span>
              <span class="badge-age">${item.ageGroup}</span>
              <span class="text-xs font-black text-slate-950 dark:text-white">Level ${item.levelNumber} / 10</span>
            </div>

            <h3 class="text-2xl font-black mb-3 text-slate-950 dark:text-white">${item.name}</h3>
            <p class="text-sm text-slate-950 dark:text-white font-semibold mb-4 leading-relaxed">${item.description}</p>
            
            <!-- 5-Way Specifications Grid -->
            <div class="space-y-2 py-3 border-y border-theme text-xs">
              <div class="flex justify-between"><span class="text-slate-950 dark:text-white font-black">🎯 Target Age Group:</span><span class="font-black text-slate-950 dark:text-white">${item.ageGroup} Recommended</span></div>
              <div class="flex justify-between"><span class="text-slate-950 dark:text-white font-black">⚡ Cognitive Difficulty:</span><span class="font-black text-slate-950 dark:text-white">${item.difficulty} Tier (Level ${item.levelNumber} / 10)</span></div>
              <div class="flex justify-between"><span class="text-slate-950 dark:text-white font-black">🧩 Piece Count:</span><span class="font-black text-slate-950 dark:text-white">${item.pieces} ${item.pieces === 1 ? 'Internal Chamber Core' : 'Interlocking Parts'}</span></div>
              <div class="flex justify-between"><span class="text-slate-950 dark:text-white font-black">🪵 Primary Material:</span><span class="font-black text-slate-950 dark:text-white">${item.material}</span></div>
              <div class="flex justify-between"><span class="text-slate-950 dark:text-white font-black">⏱️ Expected Solve Window:</span><span class="font-black text-slate-950 dark:text-white">${item.solveTimeAvg}</span></div>
              <div class="flex justify-between"><span class="text-slate-950 dark:text-white font-black">Precision Machining:</span><span class="font-black text-slate-950 dark:text-white">±0.02 mm CNC Tolerance</span></div>
              <div class="flex justify-between"><span class="text-slate-950 dark:text-white font-black">Mensa Calibration:</span><span class="font-black text-slate-950 dark:text-white">Certified Logic Challenge</span></div>
            </div>
          </div>
          <div class="pt-6 flex items-center justify-between">
            <span class="text-2xl font-black text-slate-950 dark:text-white">$${item.price.toFixed(2)}</span>
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
    // 1. Difficulty tab filter buttons
    const tabButtons = document.querySelectorAll('.filter-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentDifficulty = btn.getAttribute('data-filter');
        syncFilterControls();
        renderGrid();
      });
    });

    // 2. Age Group select
    const ageSelect = document.getElementById('filter-age-select');
    if (ageSelect) {
      ageSelect.addEventListener('change', (e) => {
        currentAge = e.target.value;
        renderGrid();
      });
    }

    // 3. Piece Count select
    const piecesSelect = document.getElementById('filter-pieces-select');
    if (piecesSelect) {
      piecesSelect.addEventListener('change', (e) => {
        currentPieces = e.target.value;
        renderGrid();
      });
    }

    // 4. Material select
    const matSelect = document.getElementById('filter-material-select');
    if (matSelect) {
      matSelect.addEventListener('change', (e) => {
        currentMaterial = e.target.value;
        renderGrid();
      });
    }

    // 5. Estimated Solving Time select
    const timeSelect = document.getElementById('filter-time-select');
    if (timeSelect) {
      timeSelect.addEventListener('change', (e) => {
        currentTime = e.target.value;
        renderGrid();
      });
    }

    // 6. Sort select
    const sortSelect = document.getElementById('product-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGrid();
      });
    }

    // 7. Search input
    const searchInput = document.getElementById('product-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderGrid();
      });
    }

    // 8. Clear All Filters button
    const clearBtn = document.getElementById('clear-all-filters-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', resetAllFilters);
    }

    // 9. Quick View Modal Close
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

    syncFilterControls();
    renderGrid();
  }

  document.addEventListener('DOMContentLoaded', initProductPage);

})();
