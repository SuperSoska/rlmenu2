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
            { name: 'Jasmine Flower', description: 'Whitley Neil Distiller\'s Cut Gin / jasmine cordial / lavender syrup / pineapple puree / soda', descriptionPolish: 'Whitley Neil Distiller\'s Cut Gin / kordian Jaśminowy / syrop lawendowy / puree ananas / woda gazowana', price: 34, image: 'JasminFlower.webp' },
            { name: 'Kiwi Crush', description: 'Whitley Neil Distiller\'s Cut Gin / Frizzante / kiwi puree / lavender syrup/ lime', descriptionPolish: 'Whitley Neil Distiller\'s Cut Gin / Frizzante / puree kiwi / syrop lawendowy/ limonka', price: 34, image: 'KiwiCrush.webp' },
            { name: 'Lavendula', description: 'Gibson\'s Gin / rosemary / sour / lavender syrup / tonic', descriptionPolish: 'Gibson\'s Gin / rozmaryn / sour / syrop lawendowy / tonik', price: 31, image: 'Lavendula.webp' },
            { name: 'Czarno-Bialy Bez', description: 'Gibson\'s Gin / elderberry jam / elderflower syrup / lime', descriptionPolish: 'Gibson\'s Gin / konfitura z bzu / syrop z bzu / limonka', price: 33, image: 'CzarnoBialy.webp' },
            { name: 'Red Light', description: 'vodka / pomegranate juice / 7up / grenadine', descriptionPolish: 'wódka / sok z granatu / 7up / grenadyna / cukier brązowy / limonka', price: 30, image: 'RedLight.webp' },
            { name: 'Irish Highball', description: 'Bushmill\'s Original / honey soda / ginger beer / sour', descriptionPolish: 'Bushmill\'s Original / woda miodowa / ginger beer / sour', price: 34, image: 'IrishHighball.webp' }
        ],
        krakenCocktails: [
            { name: 'Thaiquiri', description: 'Kraken Black Spiced / melon liqueur / passionfruit puree / pandan syrup', descriptionPolish: 'Kraken Black Spiced / likier melonowy / puree marakuja / syrop pandan', price: 38, image: 'Thaiquiri.webp' },
            { name: 'Kraken Colada', description: 'Kraken Black Spiced / pineapple puree / coconut syrup / lime / cardamon bitter', descriptionPolish: 'Kraken Black Spiced / puree anans / syrop kokosowy / limonka / bitter kardamonowy', price: 38, image: 'KrakenColada.webp' },
            { name: 'Strawberry Bloom', description: 'Kraken Black Spiced / Malibu / strawberry puree / almond syrup / lime', descriptionPolish: 'Kraken Black Spiced / Malibu / puree truskawkowe / syrop migdalowy / limonka', price: 38, image: 'StrawberryBloom.webp' },
            { name: 'Tokyo Midnight', description: 'Kraken Black Spiced / Kahlua / Sherry / espresso / banana / miso / maple syrup', descriptionPolish: 'Kraken Black Spiced / Kahlua / Sherry / puree banan / miso / syrop klonowy', price: 37, image: 'TokioMidnight.webp' },
            { name: 'Fiji Watermelon', description: 'Planteray Isle of Fiji Rum / melon liqueur / watermelon - mint cordial / chilli tincture / Angostura Cocoa Bitter', descriptionPolish: 'Planteray Isle of Fiji Rum / likier melonowy / kordiał arbuz-mietą / tynktura chilli / Angostura Cocoa Bitter', price: 34, image: 'WatermelonFiji.webp' },
            { name: 'Yuzu Pandan Breeze', description: 'Planteray Cut & Dry Coconut Rum / melon liqueur / Yuzu puree / pandan syrup / lime', descriptionPolish: 'Planteray Cut & Dry Coconut Rum / likier melonowy / puree yuzu / syrop pandan / limonka', price: 35, image: 'YuzuPandanBreeze.webp' }
        ],
        classicCocktails: [
            { name: 'Pornstar Martini', description: 'vodka / passion fruit puree / vanilla syrup / lime / Cava', descriptionPolish: 'wódka / puree marakuja / syrop waniliowy / limonka / Cava', price: 36, image: 'Pornstar.webp' },
            { name: 'Dark & Stormy', description: 'Kraken Black Spiced / ginger beer / lime', descriptionPolish: 'Kraken Black Spiced / ginger beer / limonka', price: 36, image: 'DarkAndStormy.webp' },
            { name: 'Modern Bramble', description: 'Gibson\'s Gin / Chambord / sour / strawberry-blackberry foam', descriptionPolish: 'Gibson\'s Gin / Chambord / sour / cukier / pianka jeżynowo-poziomkowa', price: 35, image: 'ModernBramble.webp' },
            { name: 'Old Cuban', description: 'Kraken Black Spiced / lime / sugar syrup / Angostura Bitter / mint / Cava', descriptionPolish: 'Kraken Black Spiced / limonka / syrop cukrowy / Angostura Bitter / mięta / Cava', price: 33, image: 'OldCuban.webp' },
            { name: 'Whiskey Sour // New York', description: 'Evan Wiliams Kentucky Straight Bourbon / sour / maple syrup / Angostura Bitter / egg white // red dry wine', descriptionPolish: 'Evan Wiliams Kentucky Straight Bourbon / sour / syrop klonowy / Angostura bitter / bialko jajka // czerwone wino wytrawne', price: 39, image: 'NewYorkSour.webp', specialClass: 'whiskey-sour' },
            { name: 'Bergamot Negroni', description: 'Italicus / Gin / Campari / vermouth', descriptionPolish: 'Italicus / gin / Campari / wermut', price: 34, image: 'Negroni.webp' }
        ],
        jackDanielsCocktails: [
            { name: 'Lynchbourg Lemonade', description: 'Jack Daniel\'s / Cointreau / sour / sugar / 7up', descriptionPolish: 'Jack Daniel\'s / Cointreau / sour / cukier / 7up', price: 34, image: 'LynczburgLemonade.webp' },
            { name: 'Gin Basil Smash', description: 'Gin Mare / basil / lime / sugar', descriptionPolish: 'Gin Mare / bazylia / limonka / cukier', price: 40, image: 'GinBasilSmash.webp' },
            { name: 'Penicilin', description: 'Benriach Smoky 10yo / ginger-honey syrup / sour', descriptionPolish: 'Benriach Smoky 10yo / syrop miodowo - imbirowy / sour', price: 40, image: 'Penicilin.webp' },
            { name: 'Gimlet', description: 'Ford\'s Gin / lime / sugar', descriptionPolish: 'Ford\'s Gin / limonka / cukier', price: 32, image: 'Gimlet.webp' },
            { name: 'Boulvardier', description: 'Jack Daniels Triple Mash / Campari / vermouth', descriptionPolish: 'Jack Daniels Triple Mash / Campari / wermut', price: 38, image: 'Boulvardier.webp' },
            { name: 'Woodford Old Fashioned', description: 'Woodford Reserve / Angostura Bitter / sugar', descriptionPolish: 'Woodford Reserve / Angostura Bitter / cukier', price: 42, image: 'OldFashioned.webp' },
            { name: 'Botucal Daiquiri', description: 'Botucal Riserva Exclusiva / lime / sugar', descriptionPolish: 'Botucal Riserva Exclusiva / limonka / cukier', price: 43, image: 'BotucalDaiquiri.webp' }
        ],
        shots: [
            { name: 'Homemade Lemon Vodka', description: 'Cytrynówka Pana Jana 1x40ML', descriptionPolish: '', price: 15 },
            { name: 'Bees 4x40ML', description: 'Vodka / sour / ginger Syrup', descriptionPolish: 'Wodka / sour / syrop imbirowy', price: 30 },
            { name: 'White elderflower 4x40ML', description: 'Vodka / sour / elderflower syrup', descriptionPolish: 'Wódka / sour / syrop z bzu', price: 30 },
            { name: 'Pear with pepper 4x40ML', description: 'Vodka / sour / pear syrup / pepper', descriptionPolish: 'Wódka / sour / syrop gruszkowy / pieprz', price: 30 },
            { name: 'Kornelia 4x40ML', description: 'sambuca / white rum / sour / elderflower syrup', descriptionPolish: 'sambuca / bialy rum / sour / syrop z bzu', price: 38},
            { name: 'Cocaine 2x50ML', description: 'Jagermeister / malibu / lime', descriptionPolish: 'Jagermeister / malibu / limonka', price: 30},
            { name: 'Tequila 40ML & Sangrita 30ML', description: 'tequila / sangrita', descriptionPolish: '', price: 22},
            { name: 'Kraken Black Spiced 40ML', description: '', descriptionPolish: '', price: 21 },
            { name: 'Kraken Roast Coffee Black Spiced 40ML', description: '', descriptionPolish: '', price: 21 },
        ],
        mocktails: [
            { name: 'Aperol Spritz', description: 'Martini Vibrante 0% / Prosecco 0% / soda / orange', descriptionPolish: 'Martini Vibrante 0% / Prosecco 0% / woda gazowana / pomarancza', price: 28 },
            { name: 'Jasmine Flower', description: 'Tanqueray Gin 0% / jasmine cordial / lavender syrup / pineapple puree / soda', descriptionPolish: 'Tanqueray Gin 0% / kordial jaśminowy / syrop lawenda / puree ananas/ woda gazowana', price: 32 },
            { name: 'Hugo', description: 'Prosecco 0% / lime / mint / elderflower syrup / soda', descriptionPolish: 'Prosecco 0% / limonka / mięta / syrop z bzu / woda gazowana', price: 29 },
            { name: 'Lavendula', description: 'Tanqueray Gin 0% / rosemary / sour / lavender syrup / tonic', descriptionPolish: 'Tanqueray Gin 0% / rozmaryn / sour / syrop lawendowy / tonik', price: 31 },
            { name: 'Czarno-Bialy Bez', description: 'Tanqueray Gin 0% / lime / elderflower syrup / elderberry jam', descriptionPolish: 'Tanqueray Gin 0% / limonka / syrop z bzu / konfitura z bzu', price: 30 },
            { name: 'Gin Basil Smash', description: 'Tanqueray Gin 0% / sour / sugar / basil', descriptionPolish: 'Tanqueray Gin 0% / sour / cukier / bazylia', price: 27 },
            { name: 'Kiwi Crush', description: 'Tanqueray Gin 0% / prosecco 0% / kiwi puree / lavender syrup / lime', descriptionPolish: 'Tanqueray Gin 0% / prosecco 0% / puree kiwi / syrop lawendowy / limonka', price: 33 },
            { name: 'Haze 4x40 ML', description: 'homemade CBD syrup / Martini Floreale 0% / passionfruit puree / lime', descriptionPolish: 'domowy syrop CBD / Martini Floreale 0% / puree marakuja / limonka', price: 32 }
        ],
        softDrinks: [
            { name: 'Matcha Honey Lemonade', description: 'matcha / honey / sour', descriptionPolish: 'matcha / miód / sour', price: 22},
            { name: 'Lemonade', description: 'Classic 16 PLN / Fruity 19 PLN', descriptionPolish: 'Klasyczna 16 PLN / Owocowa 19 PLN', price: 16},
            { name: 'Orange Espresso Tonic', description: 'espresso / freshly squezed orange juice / tonic', descriptionPolish: 'espresso / swieżo wyciskany sok z pomarańczy / tonik', price: 21},
            { name: 'Iced Matcha Late', description: 'matcha / milk(or plant milk)', descriptionPolish: 'matcha / mleko (lub mleko roslinne)', price: 21}
        ],
        hotDrinks: [
            { name: 'Japanese Plant Milk Matcha', description: 'matcha / plant milk', descriptionPolish: 'matcha / mleko roslinne', price: 21},
            { name: 'Espresso', description: '', descriptionPolish: '', price: 10},
            { name: 'Espresso Doppio', description: '', descriptionPolish: '', price: 12 },
            { name: 'Americano', description: '', descriptionPolish: '', price: 13 },
            { name: 'Cappucino / Latte', description: 'plant milk +3PLN', descriptionPolish: '', price: 16 },
            { name: 'Tea / Herbata', description: 'black, green, fruity - ask at the bar / served in a teapot', descriptionPolish: 'czarna, zielona, owocowa - pytaj na barze/ podawana w imbryku', price: 17 },
            { name: 'Other', description: 'Pepsi, 7UP, Schweppes, Juices 11PLN', descriptionPolish: '', price: 11 },
            { name: 'Red Bull', description: '', descriptionPolish: '', price: 18 },
            { name: 'Bear mate', description: '330 ML', descriptionPolish: '', price: 18 },
            { name: 'Mio Mio Mate', description: '500 ML', descriptionPolish: '', price: 19 }
        ],
        bottles: [
            { name: 'Homemade Lemon Vodka 0,5L', description: 'Cytrynowka Pana Jana', descriptionPolish: '', price: 150 },
            { name: 'Zubrowka 0,5 + Soft', description: '', descriptionPolish: '', price: 150 },
            { name: 'Bocian Vodka 0,5L + Soft', description: '', descriptionPolish: '', price: 160 },
            { name: 'Belvedere Vodka 0,7L + Soft', description: '', descriptionPolish: '', price: 350 },
            { name: 'Chlopska (Variety of flavors) 0,5L + Soft', description: '', descriptionPolish: 'rózne smaki', price: 150 },
            { name: 'Soplica (Variety of flavors) 0,5L + Soft', description: 'rózne smaki', descriptionPolish: '', price: 150 },
            { name: 'Jack Daniels 0,7L + Soft', description: '', descriptionPolish: '', price: 290 },
            { name: 'The Famous Grouse 0,7L + Soft', description: '', descriptionPolish: '', price: 260 },
            { name: 'Kraken Black Spiced Rum 0,7L + Soft', description: '', descriptionPolish: '', price: 270 },
            { name: 'Gibsons 0,7L + Soft', description: '', descriptionPolish: '', price: 250 },
            { name: 'Bombay Gin 0,7L + Soft', description: '', descriptionPolish: '', price: 290 },
            { name: 'Jose Cuervo Tequila Silver 0,7L + Soft, lime, salt', description: 'limonka, sól, soft', descriptionPolish: '', price: 290 },
            { name: 'Jagermeister 0,7L + Soft', description: '', descriptionPolish: '', price: 270 },
            { name: 'Jagermeister  + 5x Red Bull', description: '', descriptionPolish: '', price: 290 },
        ],
        wine: [
            // Non-alcoholic wines (first 2 items)
            { name: 'Proseco 0%', type: 'non-alcoholic', origin: '', description: '', descriptionPolish: '', priceGlass: 18, priceBottle: 100 },
            { name: 'Riesling 0%', type: 'non-alcoholic', origin: '', description: '', descriptionPolish: '', priceGlass: 26, priceBottle: 140 },
            
            // Sparkling wines
            { name: 'Castel ROC Brut', type: 'sparkling', origin: 'Cava, Spain, Macabeo, Xarello, Parellada', description: 'refreshing, elegant, citrus fruits, apricot, toasty', descriptionPolish: 'orzeźwiające, eleganckie, cytrusy, morela, aromaty tostowe', priceGlass: 24, priceBottle: 120},
            { name: 'Frizante from tap', type: 'sparkling', origin: 'Ponte Frizzante Bianco, Veneto, Italy, Glera', description: 'gentle, hint of fruits and flowers', descriptionPolish: 'delikatne, kwiatowo-owocowe', priceGlass: 18},
            
            // White wines
            { name: 'Casal Sobreiro Branco', type: 'white', origin: 'Leira, Portugal, Fernão Pires, Moscatel', description: 'soft, aromatic, white flowers, tropical and citrus fruits', descriptionPolish: 'miękkie, owoce tropicalne, cytrusy oraz kwiaty', priceGlass: 18, priceBottle: 100 },
            { name: 'DOM Charbielin C', type: 'white', origin: 'Opolskie, Poland, Souvignier Gris', description: 'aromatic, refreshing, flowers, citrus fruits, finished with subtle acidity', descriptionPolish: 'aromtyczne, orzeźwiające, kwiaty, cytrusy, subtelną kwasowość i słodycz w zakończeniu ', priceGlass: 29, priceBottle: 160},
            { name: 'S.Osvaldo', type: 'white', origin: 'Veneto, Italy, Pinot Grigio', description: 'gentle, satisfying, white flowers, pear and apple, citrus fruits', descriptionPolish: 'delikatne, bardzo przyjemne, białe kwiaty, gruszka, jabłko, owoce cytrusowe', priceGlass: 22, priceBottle: 125},
            { name: 'The Tracer', type: 'white', origin: 'Pfalz, Germany, Riesling', description: 'dry, fresh, aromatic, tropical and citrus fruits', descriptionPolish: 'wytrawne, świeże, aromatyczne, owoce tropikalne, cytrusy', priceGlass: 23, priceBottle: 130},
            { name: 'Cantina Rauscedo', type: 'white', origin: 'Friuli, Italy, Sauvignon Blanc', description: 'aromatic, fresh, sage, blackcurrant, citrus fruits', descriptionPolish: 'aromatyczne, świeże, szałwia, czarna porzeczka, cytrusy', priceGlass: 25, priceBottle: 140},
            { name: 'Müller Gottweiger Berg', type: 'white', origin: 'Kremstal, Austria, Grüner Veltliner', description: 'juicy, mineral, grapefruit, pear, herbs', descriptionPolish: 'soczyste, mineralne, grejpfrut, gruszka, zioła', priceGlass: 27, priceBottle: 150},
            
            // Red wines
            { name: 'Casal Sobreiro Tinto', type: 'red', origin: 'Leira, Portugal, Castelão, Aragonez', description: 'smooth, round, cassis, cherry, velvety tannins', descriptionPolish: 'czerwone owoce wiśni, jeżyny z nutami fiołków  w tle, soczyste i krągłe ', priceGlass: 18, priceBottle: 100 },
            { name: 'Cantine Ionis Julius', type: 'red', origin: 'Salento, Italy, Negroamaro', description: 'aromatic, balanced, forest fruits, mixed spice, herbs', descriptionPolish: 'aromatyczne, harmonijne, owoce leśne, przyprawy korzenne, zioła', priceGlass: 23, priceBottle: 130},
            { name: 'Jaros Roble', type: 'red', origin: 'Ribera del Duero, Spain, Tempranillo', description: 'juicy, silky, blackberry, cherry, mixed spice, dark chocolate, oaked', descriptionPolish: 'soczyste, miękkie, jeżyna, wiśnia, przyprawy korzenne, gorzka czekolada, dębowy', priceGlass: 29, priceBottle: 160},
            
        ]
    };

    // Function to create drink items
    function createDrinkItems() {
        Object.entries(drinksData).forEach(([section, drinks]) => {
            const sectionElement = document.getElementById(section);
            if (!sectionElement) return;
            const grid = sectionElement.querySelector('.drinks-grid');
            grid.innerHTML = '';
            // Categories that should NOT have images or card-back
            const noImageCategories = ['shots', 'mocktails', 'softDrinks', 'hotDrinks', 'bottles', 'wine'];
            if (section === 'wine') {
                // Group wines by type
                const nonAlcoholic = drinks.filter(d => d.type === 'non-alcoholic');
                const sparkling = drinks.filter(d => d.type === 'sparkling');
                const whites = drinks.filter(d => d.type === 'white');
                const reds = drinks.filter(d => d.type === 'red');
                
                // Helper function to create heading
                function createHeading(text) {
                    const heading = document.createElement('h3');
                    heading.textContent = text;
                    heading.style.gridColumn = '1 / -1';
                    heading.style.margin = '1.2rem 0 0.5rem 0';
                    heading.style.fontFamily = 'UnifrakturCook, cursive';
                    heading.style.color = 'var(--subcategory-color)';
                    heading.style.fontSize = '1.5rem';
                    return heading;
                }
                
                // Helper function to create drink item
                function createDrinkItem(drink) {
                    const drinkItem = document.createElement('div');
                    drinkItem.className = 'drink-item text-only';
                    const priceDisplay = drink.priceBottle ? `${drink.priceGlass}/${drink.priceBottle}` : drink.priceGlass;
                    const originText = drink.origin ? `<p class="origin">${drink.origin}</p>` : '';
                    drinkItem.innerHTML = `
                        <div class="card-front">
                            <div class="name-price-row">
                                <h3>${drink.name}</h3>
                                <p class="price">${priceDisplay}</p>
                            </div>
                            ${originText}
                            <p>${drink.description}</p>
                            <p class="polish">${drink.descriptionPolish}</p>
                        </div>
                    `;
                    return drinkItem;
                }
                
                // Display non-alcoholic wines first (no heading)
                nonAlcoholic.forEach(drink => {
                    grid.appendChild(createDrinkItem(drink));
                });
                
                // Display sparkling wines
                if (sparkling.length) {
                    grid.appendChild(createHeading('Sparkling Wines'));
                    sparkling.forEach(drink => {
                        grid.appendChild(createDrinkItem(drink));
                    });
                }
                
                // Display white wines
                if (whites.length) {
                    grid.appendChild(createHeading('White Wines'));
                    whites.forEach(drink => {
                        grid.appendChild(createDrinkItem(drink));
                    });
                }
                
                // Display red wines
                if (reds.length) {
                    grid.appendChild(createHeading('Red Wines'));
                    reds.forEach(drink => {
                        grid.appendChild(createDrinkItem(drink));
                    });
                }
            } else if (noImageCategories.includes(section)) {
                drinks.forEach(drink => {
                    const drinkItem = document.createElement('div');
                    drinkItem.className = 'drink-item text-only'; // Add text-only class
                    drinkItem.innerHTML = `
                        <div class="card-front">
                            <div class="name-price-row">
                                <h3>${drink.name}</h3>
                                <p class="price">${drink.price}</p>
                            </div>
                            <p>${drink.description}</p>
                            <p class="polish">${drink.descriptionPolish}</p>
                        </div>
                    `;
                    grid.appendChild(drinkItem);
                });
            } else {
                drinks.forEach(drink => {
                    const drinkItem = document.createElement('div');
                    drinkItem.className = 'drink-item flip-card';
                    if (drink.specialClass) {
                        drinkItem.classList.add(drink.specialClass);
                    }
                    drinkItem.innerHTML = `
                        <div class="card-front">
                            <h3>${drink.name}</h3>
                            <p>${drink.description}</p>
                            <p class="polish">${drink.descriptionPolish}</p>
                            <div class="drink-item-bottom-row"><p class="price">${drink.price}</p></div>
                            <div class="eye-anim"><img src="EyeAnim/TFrame1.png" alt="Eye Animation"></div>
                        </div>
                        <div class="card-back">
                            <h3>${drink.name}</h3>
                            <img src="${getDrinkImage(section, drink)}" alt="${drink.name}">
                        </div>
                    `;
                    grid.appendChild(drinkItem);
                });
            }
        });
    }

    // Function to get appropriate image for each drink
    function getDrinkImage(section, drink) {
        if (drink && drink.image) {
            return 'RedLightProductFinal/' + drink.image;
        }
        return 'RedLightMenuPNGs/testcocktail.jpg';
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
        threshold: 1.0 // Trigger when 100% of the card is in view
    };

    // Eye animation logic
    const eyeFrames = [
        'EyeAnim/TFrame1.png',
        'EyeAnim/TFrame2.png',
        'EyeAnim/TFrame3.png',
        'EyeAnim/TFrame4.png'
    ];
    const eyeAnimIntervals = new WeakMap();

    function startEyeAnim(card) {
        const eyeImg = card.querySelector('.eye-anim img');
        if (!eyeImg) return;
        if (eyeAnimIntervals.has(card)) return; // Already animating
        // Play blink once every 2 seconds
        const interval = setInterval(() => {
            // Blink sequence: show frames 2, 3, 4, then back to 1
            let frame = 1;
            function nextFrame() {
                if (frame < eyeFrames.length) {
                    eyeImg.src = eyeFrames[frame];
                    frame++;
                    setTimeout(nextFrame, 60); // 60ms per blink frame
                } else {
                    eyeImg.src = eyeFrames[0]; // Reset to open eye
                }
            }
            nextFrame();
        }, 2000);
        eyeAnimIntervals.set(card, interval);
    }
    function stopEyeAnim(card) {
        const eyeImg = card.querySelector('.eye-anim img');
        if (!eyeImg) return;
        if (eyeAnimIntervals.has(card)) {
            clearInterval(eyeAnimIntervals.get(card));
            eyeAnimIntervals.delete(card);
        }
        eyeImg.src = eyeFrames[0];
    }

    // Update observer callback to start/stop eye animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.classList.contains('flip-card')) {
                    startEyeAnim(entry.target);
                }
            } else {
                entry.target.classList.remove('in-view');
                if (entry.target.classList.contains('flip-card')) {
                    stopEyeAnim(entry.target);
                }
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

    // JavaScript for parallax background effect - OPTIMIZED VERSION
    const bgImages = document.querySelectorAll('.bg-image');
    const parallaxSpeed = 0.1; // Adjust this value for stronger/weaker effect
    
    // Performance optimization variables
    let ticking = false;
    let lastScrollY = 0;
    let animationFrameId = null;

    function updateParallax() {
        const scrolled = window.scrollY;
        
        // Only update if scroll position actually changed significantly
        if (Math.abs(scrolled - lastScrollY) < 1) return;
        
        lastScrollY = scrolled;
        
        bgImages.forEach(bgImage => {
            // Only apply parallax to the active background image
            if (bgImage.classList.contains('bg-active')) {
                // Use transform3d for hardware acceleration
                bgImage.style.transform = `translate3d(0, ${-scrolled * parallaxSpeed}px, 0)`;
            }
        });
    }

    // Throttled scroll handler using requestAnimationFrame
    function handleScroll() {
        if (!ticking) {
            ticking = true;
            animationFrameId = requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
        }
    }

    // More efficient scroll event listener with passive option
    let scrollTimeout;
    function throttledScrollHandler() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 16); // ~60fps
    }

    // Listen for scroll events with throttling
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Also update parallax on page load to set initial position
    updateParallax();

    // Performance monitoring (optional - can be removed in production)
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) { // Every second
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            console.log(`Scroll FPS: ${fps}`);
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorPerformance);
    }
    
    // Start performance monitoring (comment out in production)
    // monitorPerformance();

    // Cleanup animation frame on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

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