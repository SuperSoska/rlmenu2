document.addEventListener('DOMContentLoaded', () => {
    // Navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.menu-section');
    let isScrollingToTop = false; // Flag to indicate if the back to top button is being used

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // If scrolling to top is in progress via the button, do not process category change
            if (isScrollingToTop) {
                return;
            }

            const sectionId = button.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);

            // Hide all sections and remove active class from other category buttons
            sections.forEach(section => {
                if (section.id !== sectionId) {
                    section.style.display = 'none';
                }
            });
            navButtons.forEach(btn => {
                // Only deselect other buttons if they are category buttons (have a data-section attribute)
                if (btn !== button && btn.hasAttribute('data-section')) {
                    btn.classList.remove('active');
                }
            });

            // Show corresponding section and add active class to clicked button
            if (targetSection) {
                targetSection.style.display = 'block';
            }
            button.classList.add('active');

            // Handle background image transitions (new)
            document.querySelectorAll('.bg-image').forEach(bg => {
                bg.classList.remove('bg-active');
            });
            const bgToActivate = document.querySelector(`.bg-image[data-section="${sectionId}"]`);
            if (bgToActivate) bgToActivate.classList.add('bg-active');
        });
    });

    // On page load, activate the correct background (new)
    document.querySelectorAll('.bg-image').forEach(bg => {
        bg.classList.remove('bg-active');
    });
    const initialActiveSection = document.querySelector('.menu-section.active');
    if (initialActiveSection) {
        const sectionId = initialActiveSection.id;
        const bgToActivate = document.querySelector(`.bg-image[data-section="${sectionId}"]`);
        if (bgToActivate) bgToActivate.classList.add('bg-active');
    }

    // Add drink items to each section
    const drinksData = {
        redLightCocktails: [
            { name: 'Jasmine Flower', description: 'Whitley Neil Distiller\'s Cut Gin / jasmine cordial / lavender syrup / pineapple puree / soda', descriptionPolish: 'Whitley Neil Distiller\'s Cut Gin / jasmine cordial / lavender syrup / pineapple puree / soda', price: 34, image: 'JasminFlower.jpg' },
            { name: 'Kiwi Crush', description: 'Whitley Neil Distiller\'s Cut Gin / Frizzante / kiwi puree / lavender syrup/ lime', descriptionPolish: 'Whitley Neil Distiller\'s Cut Gin / Frizzante / kiwi puree / lavender syrup/ lime', price: 34, image: 'KiwiCrush.jpg' },
            { name: 'Lavendula', description: 'Gibson\'s Gin / rosemary / sour / lavender syrup / schweppes', descriptionPolish: 'Gibson\'s Gin / rosemary / sour / lavender syrup / schweppes', price: 31, image: 'Lavendula.jpg' },
            { name: 'Czarno-Bialy Bez', description: 'Gibson\'s Gin / elderberry jam / elderflower syrup / lime', descriptionPolish: 'Gibson\'s Gin / elderberry jam / elderflower syrup / lime', price: 33, image: 'CzarnoBialy.jpg' },
            { name: 'Red Light', description: 'vodka / pomegranate juice / 7up / grenadine', descriptionPolish: 'vodka / pomegranate juice / 7up / grenadine', price: 30, image: 'RedLight.jpg' },
            { name: 'Irish Highball', description: 'Bushmill\'s Original / honey soda / ginger beer / sour', descriptionPolish: 'Bushmill\'s Original / honey soda / ginger beer / sour', price: 34, image: 'IrishHighball.jpg' }
        ],
        krakenCocktails: [
            { name: 'Thaiquiri', description: 'Kraken Black Spiced Rum / melon liquer / passionfruit puree / pandan syrup', descriptionPolish: 'Kraken Black Spiced Rum / irish cream / syrop waniliowy / syropcynamonowy / śmietanka / mleko', price: 38 },
            { name: 'Kraken Colada', description: 'Kraken Black Spiced / pineapple puree / coconut syrup / lime / cardamon bitter', descriptionPolish: 'Kraken Black Spiced Rum / wermut / dymna whisky / Amaro Montenegro / bitter', price: 38 },
            { name: 'Strawberry Bloom', description: 'Kraken Black Spiced Rum / Malibu / strawberry puree / almond syrup / lime', descriptionPolish: 'Kraken Black Spiced Rum / Metaxa / syrop gruszkowy / sour/ rozmaryn', price: 38 },
            { name: 'Tokyo Midnight', description: 'Kraken Black Spiced Rum / Kahlua / Sherry / espresso / banana / miso / maple syrup', descriptionPolish: 'Kraken Black Spiced Rum / likier kawowy / swieży sok z pomarańczy / syrop czekoladowy / sour', price: 37 },
            { name: 'Fiji Watermelon', description: 'Planteray Isle of Fiji Rum / melon liquer / watermelon - mint cordial / chilli tincture / Angostura Cocoa Bitter', descriptionPolish: 'Kraken Black Spiced Rum / piwo imbirowe / limonka', price: 34},
            { name: 'Yuzu Pandan Breeze', description: 'Planteray Cut & Dry Coconut Rumu / melon liquer / Yuzu puree / pandan syrup / lime', descriptionPolish: 'Kraken Black Spiced Rum / limonka / cukier / Cava / bitter / mieta', price: 35}
        ],
        classicCocktails: [
            { name: 'Pornstar Martini', description: 'vodka / passion fruit puree / lime / Cava', descriptionPolish: 'wodka / puree z marakui / limonka / Cava', price: 36 },
            { name: 'Dark & Stormy', description: 'Kraken Black Spiced / ginger beer / lime', descriptionPolish: 'Italicus / gin / Campari / wermut', price: 36 },
            { name: 'Modern Bramble', description: 'Gibson\'s Gin / Chambord / sour / strawberry-blackberry foam', descriptionPolish: 'Pisco / limonka / syrop z agawy / bialko jajka / bitter kardamonowy', price: 35 },
            { name: 'Old Cuban', description: 'Kraken Black Spiced / lime / sugar syrup / Angostura Bitter / mint / Cava', descriptionPolish: 'Evan Williams Kentucky Straight Bourbon / sour / syrop klonowy / bitter / bialko jajka', price: 33 },
            { name: 'Whiskey Sour // New York', description: '', descriptionPolish: 'wódka / Jose Cuervo Silver / rum / Gibson\'s Gin / Archers / sour/ pepsi', price: 39 },
            { name: 'Bergamot Negroni', description: 'Italicus / Gin / Campari / vermouth', descriptionPolish: 'Gibson\'s Gin / Chambord / sour / cukier', price: 34 }
        ],
        jackDanielsCocktails: [
            { name: 'Lynchbourg Lemonade', description: 'Jack Daniel\'s / Cointreau / sour / sugar / 7up', descriptionPolish: 'Jack Daniel\'s / Cointreau / sour / cukier / 7up', price: 34 },
            { name: 'Gin Basil Smash', description: 'Gin Mare / fresh basil / lime / sugar', descriptionPolish: 'Gin Mare / swieża bazylia / limonka / cukier', price: 40 },
            { name: 'Penicilin', description: 'Benriach Smoky 10yo / ginger-honey syrup / sour', descriptionPolish: 'Benriach Smoky 10yo / syrop miodowo - imbirowy / sour', price: 40},
            { name: 'Gimlet', description: 'Ford\'s Gin / lime 1 sugar', descriptionPolish: 'Ford\'s Gin / limonka / cukier', price: 32 },
            { name: 'Boulvardier', description: 'Jack Daniels Triple Mash / Campari / vermouth', descriptionPolish: 'Jack Daniels Triple Mash / Campari / wermut', price: 38 },
            { name: 'Woodford Old Fashioned', description: 'Woodford Reserve / bitters / sugar /', descriptionPolish: 'Woodford Reserve / bitter / cukier', price: 42},
            { name: 'Botucal Daiquiri', description: 'Botucal Riserva Exclusiva / lime / sugar', descriptionPolish: 'Botucal Riserva Exclusiva / limonka / cukier', price: 0 },
        ],
        shots: [
            { name: 'Homemade Lemon Vodka', description: '', descriptionPolish: '', price: 15 },
            { name: 'Bees', description: 'Vodka / sour / Ginger Syrup', descriptionPolish: 'Wodka / sour / syrop imbirowy', price: 30 },
            { name: 'Bialy Bez', description: 'Vodka / sour / syrop z bzu', descriptionPolish: 'Wodka / sour / syrop z bzu', price: 30 },
            { name: 'Gruszka z pieprzem', description: 'Vodka / sour / pear syrup / pepper', descriptionPolish: 'Wodka / sour / syrop gruszkowy / pieprz', price: 30 },
            { name: 'Kornelia', description: 'sambuca / white rum / sour / elderflower syrup', descriptionPolish: 'sambuca / bialy rum / sour / syrop z bzu', price: 38},
            { name: 'Kokaina', description: 'jagermeister / malibu / lime', descriptionPolish: 'jagermeister / malibu / limonka', price: 30},
            { name: 'Tequila & Sangrita', description: 'tequila / sangrita', descriptionPolish: 'tequila / sangrita', price: 22},
            { name: 'Kraken Black Spiced', description: '', descriptionPolish: '', price: 21 },
            { name: 'Kraken Roast Coffee Black Spiced', description: '', descriptionPolish: '', price: 21 },
        ],
        mocktails: [
            { name: 'Aperol Spritz', description: 'Martini Vibrante 0% / Prosecco 0% / soda / orange', descriptionPolish: 'Martini Vibrante 0% / Prosecco 0% / woda gazowana / pomarancza', price: 28 },
            { name: 'Jasmine Flower', description: 'Tanqueraj Gin 0% / jasmine cordial / lavender syrup / pineapple puree', descriptionPolish: 'Martini Floreale 0% / sok ananasowy / sour / Thomas Henry Botanical Tonic / szczypta soli', price: 32 },
            { name: 'Hugo', description: 'Prosecco 0% / lime / fresh mint / elderflower syrup / soda', descriptionPolish: 'Prosecco 0% / limonka / swieża mieta / syrop z bzu / woda gazowana', price: 29 },
            { name: 'Lavendula', description: 'Gin 0% / rosemary / sour / lavender syrup / tonic', descriptionPolish: 'Gin 0% / rozmaryn / sour / syrop lawendowy / tonik', price: 31 },
            { name: 'Czarno-Bialy Bez', description: 'Gin 0% / lime / elderflower syrup / elderflower jam', descriptionPolish: 'Gin 0% / limonka / syrop z bzu / konfitura z bzu', price: 30},
            { name: 'Gin Basil Smash', description: 'Gin 0% / sour / sugar / fresh basil', descriptionPolish: 'Gin 0% / sour / cukier / swieża bazylia', price: 27},
            { name: 'Kiwi Crush', description: 'Tanqueraj Gin 0% / prosecco 0% / kiwi puree / lavender syrup / lime', descriptionPolish: 'Gin 0% / sour / cukier / swieża bazylia', price: 33},

            { nmae: 'Haze 4x40 ML', description: 'homemade CBD syrup / Martini Floreale 0% / passionfruit puree / lime', descriptionPolish: 'syrop CBD własny / Martini Floreale 0% / puree z marakui / limonka', price: 32},
        ],
        softDrinks: [
            { name: 'Matcha Honey Lemonade', description: 'matcha / honey / sour', descriptionPolish: 'matcha / miód / sour', price: 22},
            { name: 'Lemonade', description: 'Classic 16 PLN / Fruity 19 PLN', descriptionPolish: 'Klasyczny 16 PLN / Owocowy 19 PLN', price: 16},
            { name: 'Orange Espresso Tonic', description: 'espresso / freshly squezed orange juice / tonic', descriptionPolish: 'espresso / swieżo wyciśnięty sok z pomarańczy / tonic', price: 21},
            { name: 'Iced Matcha Late', description: 'matcha / milk(or plant milk)', descriptionPolish: 'matcha / mleko(lub mleko roslinne', price: 21}
        ],
        hotDrinks: [
            { name: 'Japanese Plant Milk Matcha', description: 'matcha / plant milk', descriptionPolish: 'matcha / mleko roslinne', price: 21},
            { name: 'Espresso', description: '', descriptionPolish: '', price: 10},
            { name: 'Espresso Dopio', description: '', descriptionPolish: '', price: 12 },
            { name: 'Americano', description: '', descriptionPolish: '', price: 13 },
            { name: 'Cappucino / Late', description: 'pant milk +3PLN', descriptionPolish: '', price: 16 },
            { name: 'Tea', description: 'black, green, fruity - ask at the bar / served in a teapot', descriptionPolish: 'polskie tlumaczenie', price: 17 },
            { name: 'Other', description: 'Pepsi, 7UP, Schweppes, Juices 11PLN', descriptionPolish: '', price: 11 },
            { name: 'Red Bull', description: '', descriptionPolish: '', price: 18 },
            { name: 'Bear mate', description: '330 ML', descriptionPolish: '', price: 18 },
            { name: 'Mio Mio', description: '500 ML', descriptionPolish: '', price: 19 }
        ],
        bottles: [
            { name: 'Homemade Lemon Vodka 0,5L', description: '', descriptionPolish: '', price: 150 },
            { name: 'Zubrowka 0,5 + Soft', description: '', descriptionPolish: '', price: 150 },
            { name: 'Bocian Vodka 0,5L + Soft', description: '', descriptionPolish: '', price: 160 },
            { name: 'Belvedere Vodka 0,7L + Soft', description: '', descriptionPolish: '', price: 350 },
            { name: 'Chlopska (Variety of flavors) 0,5L + Soft', description: '', descriptionPolish: '', price: 150 },
            { name: 'Soplica (Variety of flavors) 0,5L + Soft', description: '', descriptionPolish: '', price: 150 },
            { name: 'Jack Daniels 0,7L + Soft', description: '', descriptionPolish: '', price: 290 },
            { name: 'The Famous Grouse 0,7L + Soft', description: '', descriptionPolish: '', price: 260 },
            { name: 'Kraken Black Spiced Rum 0,7L + Soft', description: '', descriptionPolish: '', price: 270 },
            { name: 'Gibsons 0,7L + Soft', description: '', descriptionPolish: '', price: 250 },
            { name: 'Bombay Gin 0,7L + Soft', description: '', descriptionPolish: '', price: 290 },
            { name: 'Jose Cuervo Tequila Silver 0,7L + Soft, lime, salt', description: '', descriptionPolish: '', price: 290 },
            { name: 'Jagermeister 0,7L + Soft', description: '', descriptionPolish: '', price: 270 },
            { name: 'Jagermeister  + 5x Red Bull', description: '', descriptionPolish: '', price: 290 },
        ],
        wine: [
            { name: 'Casal Sobreiro Tinto', type: 'red', description: 'Leira, Portugal Castelao Aragonez', descriptionPolish: 'smooth, round, cassis, cherry, velvety tannins', price: 18 },
            { name: 'Cantine Ionis Julius', type: 'red', description: 'Salento, Italy Negroamaro', descriptionPolish: 'aromatic, balanced, forest fruits, mixed spice, herbs', price: 23},
            { name: 'Jaros Roble', type: 'red', description: 'Ribera del Duero, Spain Tempranillo', descriptionPolish: 'juicy, silky, blackberry, cherry, mixed spice, dark chocolate, oaked', price: 29},
            { name: 'Casal Sobreiro Branco ', type: 'white', description: 'Leira, Portugal, Fernao Pires, Moscatel', descriptionPolish: 'soft, aromatic, white flowers, tropical and citrus fruits', price: 18 },
            { name: 'DOM Charbielin C', type: 'white', description: 'Opolskie, Poland, Souvignier Gris', descriptionPolish: 'aromtic, refreshing, flowers, citrus fruits, finished with subtle acidity and swetness', price: 29},
            { name: 'S.Osvaldo', type: 'white', description: 'Veneto, Italy, Pinot Grigio', descriptionPolish: 'gentle, satisfying, white flowers, pear and apple, citrus fruits', price: 22},
            { name: 'The Tracer', type: 'white', description: 'Pfalz, Germany, Riesling', descriptionPolish: 'dry, fresh, aromatic, tropical and citrus fruits', price: 23},
            { name: 'Cantina Rauscedo', type:  'white', description: 'Friuli, Italy, Sauvignon Blanc', descriptionPolsih: 'aromatic, fresh, sage, blackcurrant, citrus fruits', price: 25},
            { name: 'Muller Gottweiger Berg', type: 'white', description: 'Kremstal, Austria, Gruner Veltliner', descriptionPolish: 'juicy, mineral, grapefruit, pear, herbs', price: 27},
            { name: 'Frizante from tap', type: 'Sparkling', description: 'Ponte Frizante Bianco, Veneto, Italy Glera', descriptionPolish: 'gentle, hint of fruits and flowers', price: 18},
            { name: 'Castel ROC Brut', type: 'Sparkling', description: 'Cava, Spain, Macabeo, Xarello, Parellada', descriptionPolsih: 'refreshing, elegant, citrus fruits, apricot, toasty', price: 24},
            
        ]
    };

    // Function to create drink items
    function createDrinkItems() {
        Object.entries(drinksData).forEach(([section, drinks]) => {
            const sectionElement = document.getElementById(section);
            if (!sectionElement) return;
            const grid = sectionElement.querySelector('.drinks-grid');
            grid.innerHTML = '';
            if (section === 'wine') {
                // Group wines by type
                const reds = drinks.filter(d => d.type === 'red');
                const whites = drinks.filter(d => d.type === 'white');
                if (reds.length) {
                    const redHeading = document.createElement('h3');
                    redHeading.textContent = 'Red Wines';
                    redHeading.style.gridColumn = '1 / -1';
                    redHeading.style.margin = '1.2rem 0 0.5rem 0';
                    redHeading.style.fontFamily = 'UnifrakturCook, cursive';
                    redHeading.style.color = '#8B0000';
                    redHeading.style.fontSize = '1.5rem';
                    grid.appendChild(redHeading);
                    reds.forEach(drink => {
                        const drinkItem = document.createElement('div');
                        drinkItem.className = 'drink-item flip-card';
                        drinkItem.innerHTML = `
                            <div class="card-front">
                                <h3>${drink.name}</h3>
                                <p>${drink.description}</p>
                                <p class="polish">${drink.descriptionPolish}</p>
                                <div class="drink-item-bottom-row"><p class="price">${drink.price}</p></div>
                            </div>
                            <div class="card-back">
                                <h3>${drink.name}</h3>
                                <img src="${section === 'redLightCocktails' && drink.name ? 'RedLightProductFinal/' + drink.image : 'RedLightMenuPNGs/' + getDrinkImage(section, drink.name)}" alt="${drink.name}">
                            </div>
                        `;
                        grid.appendChild(drinkItem);
                    });
                }
                if (whites.length) {
                    const whiteHeading = document.createElement('h3');
                    whiteHeading.textContent = 'White Wines & Prosecco';
                    whiteHeading.style.gridColumn = '1 / -1';
                    whiteHeading.style.margin = '1.2rem 0 0.5rem 0';
                    whiteHeading.style.fontFamily = 'UnifrakturCook, cursive';
                    whiteHeading.style.color = '#8B0000';
                    whiteHeading.style.fontSize = '1.5rem';
                    grid.appendChild(whiteHeading);
                    whites.forEach(drink => {
                        const drinkItem = document.createElement('div');
                        drinkItem.className = 'drink-item flip-card';
                        drinkItem.innerHTML = `
                            <div class="card-front">
                                <h3>${drink.name}</h3>
                                <p>${drink.description}</p>
                                <p class="polish">${drink.descriptionPolish}</p>
                                <div class="drink-item-bottom-row"><p class="price">${drink.price}</p></div>
                            </div>
                            <div class="card-back">
                                <h3>${drink.name}</h3>
                                <img src="${section === 'redLightCocktails' && drink.name ? 'RedLightProductFinal/' + drink.image : 'RedLightMenuPNGs/' + getDrinkImage(section, drink.name)}" alt="${drink.name}">
                            </div>
                        `;
                        grid.appendChild(drinkItem);
                    });
                }
            } else {
                drinks.forEach(drink => {
                    const drinkItem = document.createElement('div');
                    drinkItem.className = 'drink-item flip-card';
                    drinkItem.innerHTML = `
                        <div class="card-front">
                            <h3>${drink.name}</h3>
                            <p>${drink.description}</p>
                            <p class="polish">${drink.descriptionPolish}</p>
                            <div class="drink-item-bottom-row"><p class="price">${drink.price}</p></div>
                        </div>
                        <div class="card-back">
                            <h3>${drink.name}</h3>
                            <img src="${section === 'redLightCocktails' && drink.name ? 'RedLightProductFinal/' + drink.image : 'RedLightMenuPNGs/' + getDrinkImage(section, drink.name)}" alt="${drink.name}">
                        </div>
                    `;
                    grid.appendChild(drinkItem);
                });
            }
        });
    }

    // Function to get appropriate image for each drink
    function getDrinkImage(section, drinkName) {
        if (section === 'redLightCocktails') {
            const drink = drinksData.redLightCocktails.find(d => d.name === drinkName);
            if (drink && drink.image) {
                return `../RedLightProductFinal/${drink.image}`;
            }
        }
        return 'testcocktail.jpg';
    }

    // Initialize drink items
    createDrinkItems();

    // Flip card on click
    function addFlipCardListeners() {
        document.querySelectorAll('.flip-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Only flip if not clicking a link or button inside
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
                // Unflip all other cards
                document.querySelectorAll('.flip-card.flipped').forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('flipped');
                    }
                });
                // Flip this card
                card.classList.toggle('flipped');
            });
        });
    }
    addFlipCardListeners();

    // Add scroll animations
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the card is in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Retrigger animation by removing and re-adding the class
                entry.target.classList.remove('in-view');
                void entry.target.offsetWidth; // Force reflow
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    // Observe all drink items
    document.querySelectorAll('.drink-item').forEach(item => {
        observer.observe(item);
    });

    // Add scroll to top button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // Show button after scrolling down 100px
            backToTopBtn.style.display = 'flex'; // Use flex to keep content centered
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when the button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // JavaScript for parallax background effect
    const bgImages = document.querySelectorAll('.bg-image');
    const parallaxSpeed = 0.1; // Adjust this value for stronger/weaker effect

    function updateParallax() {
        const scrolled = window.scrollY;
        bgImages.forEach(bgImage => {
            // Only apply parallax to the active background image
            if (bgImage.classList.contains('bg-active')) {
                 bgImage.style.transform = `translateY(${-scrolled * parallaxSpeed}px)`;
            }
           
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateParallax);

    // Also update parallax on page load to set initial position
    updateParallax();

    // Reset flag when scroll ends
    window.addEventListener('scrollend', () => {
        isScrollingToTop = false;
    });

    // Swipe support for .menu-nav carousel
    const menuNav = document.querySelector('.menu-nav');
    let isDown = false;
    let startX;
    let scrollLeft;
    // For inertia
    let lastTouchX = 0;
    let lastTouchTime = 0;
    let velocity = 0;
    let inertiaFrame;

    function animateInertia() {
        if (Math.abs(velocity) < 0.1) return; // Stop if velocity is low
        menuNav.scrollLeft += velocity;
        velocity *= 0.95; // Friction
        inertiaFrame = requestAnimationFrame(animateInertia);
    }

    if (menuNav) {
        menuNav.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - menuNav.offsetLeft;
            scrollLeft = menuNav.scrollLeft;
            lastTouchX = e.touches[0].pageX;
            lastTouchTime = e.timeStamp;
            velocity = 0;
            if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
        });
        menuNav.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - menuNav.offsetLeft;
            const walk = (startX - x); // Negative for right, positive for left
            menuNav.scrollLeft = scrollLeft + walk;
            // Calculate velocity
            const now = e.timeStamp;
            const dx = e.touches[0].pageX - lastTouchX;
            const dt = now - lastTouchTime;
            if (dt > 0) {
                velocity = -dx / dt * 16; // 16ms/frame approx
            }
            lastTouchX = e.touches[0].pageX;
            lastTouchTime = now;
        });
        menuNav.addEventListener('touchend', () => {
            isDown = false;
            if (Math.abs(velocity) > 0.5) {
                inertiaFrame = requestAnimationFrame(animateInertia);
            }
        });
        menuNav.addEventListener('touchcancel', () => {
            isDown = false;
        });
    }
}); 