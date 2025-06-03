document.addEventListener('DOMContentLoaded', () => {
    // Navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.menu-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding section
            const sectionId = button.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');

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
            { name: 'Pistacchio Sour', description: 'white rum / Botegga Pistacchio / amaretto / pistacchio syrop / sour / egg white', descriptionPolish: 'bialy rum / Bottega Pistacchio / amaretto / syrop pistacjowy / sour / białko jajka', price: 13 },
            { name: 'Lavendula', description: 'Gibson\'s Gin / rosemary / sour/ lavender syrup / tonic', descriptionPolish: 'Gibson\'s Gin / rozmaryn / sour / syrop lawendowy / tonik', price: 13 },
            { name: 'Czarno-Bialy Bez', description: 'Gibson\'s Gin/elderberry jam / elderflower syrup / lime', descriptionPolish: 'Gibson\'s Gin konfitura N bzu syrop z bzu A limonka', price: 13 },
            { name: 'Red Light', description: 'vodka / pomegranate juice / 7up / lime / brown sugar / grenadine', descriptionPolish: 'wodka / sok z granatu / 7up / limonka / brazowy cukier / grenadyna', price: 13 },
            { name: 'Alamo', description: 'bourbon / tequila habanero / lime / honey / cherry syrup', descriptionPolish: 'bourbon / tequila habanero / limonka / miód / syrop wiśniowy', price: 13 },
            { name: 'Chit-Chat', description: 'Jose Cuervo Reposado / lime / pomegranate molasses / agave syrup / clitoria / rhubarb bitters', descriptionPolish: 'Jose Cuervo Reposado / limonka / melasa z granatu / syropzagawy / klitoria / bitter rabarbarowy', price: 13 }
        ],
        krakenCocktails: [
            { name: 'Golden Kornelia', description: 'Kraken Black Spiced Rum / irish cream / vanilla syrup / cinnamon syrup / cream / milk', descriptionPolish: 'Kraken Black Spiced Rum / irish cream / syrop waniliowy / syropcynamonowy / śmietanka / mleko', price: 13 },
            { name: 'Smokey Beast', description: 'Kraken Black Spiced Rum / vermouth / smoked whisky / Amaro Montenegro / biters', descriptionPolish: 'Kraken Black Spiced Rum / wermut / dymna whisky / Amaro Montenegro / bitter', price: 13 },
            { name: 'Kraken Perry', description: 'Kraken Black Spiced Rum / Metaxa / pear syrup / sour / rosemary', descriptionPolish: 'Kraken Black Spiced Rum / Metaxa / syrop gruszkowy / sour/ rozmaryn', price: 13 },
            { name: 'Chocolate Bay', description: 'Kraken Black Spiced Rum / coffee liquor / freshly squeezed orange juice / chocolate syrup / sour', descriptionPolish: 'Kraken Black Spiced Rum / likier kawowy / swieży sok z pomarańczy / syrop czekoladowy / sour', price: 13 },
            { name: 'Dark and Stormy', description: 'Kraken Black Spiced Rum / ginger beer / lime', descriptionPolish: 'Kraken Black Spiced Rum / piwo imbirowe / limonka', price: 13 },
            { name: 'Old Cuban', description: 'Kraken Black Spiced Rum / lime / sugar / Cava / biters / mint', descriptionPolish: 'Kraken Black Spiced Rum / limonka / cukier / Cava / bitter / mieta', price: 13 }
        ],
        classicCocktails: [
            { name: 'Pornstar Martini', description: 'vodka / passion fruit puree / lime / Cava', descriptionPolish: 'wodka / puree z marakui / limonka / Cava', price: 13 },
            { name: 'Bergamot Negroni', description: 'Italicus / gin / Campari / vermouth', descriptionPolish: 'Italicus / gin / Campari / wermut', price: 13 },
            { name: 'Whisky Sour', description: 'Evan Williams Kentucky Straight Bourbon / sour / maple syrup / bitters / egg white', descriptionPolish: 'Evan Williams Kentucky Straight Bourbon / sour / syrop klonowy / bitter / bialko jajka', price: 13 },
            { name: 'Pisco Sour', description: 'Pisco / lime / agave syrup / egg white / cardamon bitters', descriptionPolish: 'Pisco / limonka / syrop z agawy / bialko jajka / bitter kardamonowy', price: 13 },
            { name: 'Long Island Iced Tea', description: 'vodka / Jose Cuervo Silver / rum / Gibson\'s Gin / Archers / sour / pepsi', descriptionPolish: 'wódka / Jose Cuervo Silver / rum / Gibson\'s Gin / Archers / sour/ pepsi', price: 13 },
            { name: 'Bramble', description: 'Gibson\'s Gin / Chambord / sour / sugar', descriptionPolish: 'Gibson\'s Gin / Chambord / sour / cukier', price: 13 }
        ],
        jackDanielsCocktails: [
            { name: 'Lynchbourg Lemonade', description: 'Jack Daniel\'s / Cointreau / sour / sugar / 7up', descriptionPolish: 'Jack Daniel\'s / Cointreau / sour / cukier / 7up', price: 13 },
            { name: 'Gin Basil Smash', description: 'Gin Mare / fresh basil / lime / sugar', descriptionPolish: 'Gin Mare / swieża bazylia / limonka / cukier', price: 13 },
            { name: 'Penicilin', description: 'Benriach Smoky 10yo / ginger-honey syrup / sour', descriptionPolish: 'Benriach Smoky 10yo / syrop miodowo - imbirowy / sour', price: 13 },
            { name: 'Gimlet', description: 'Ford\'s Gin / lime 1 sugar', descriptionPolish: 'Ford\'s Gin / limonka / cukier', price: 13 },
            { name: 'Boulvardier', description: 'Jack Daniels Triple Mash / Campari / vermouth', descriptionPolish: 'Jack Daniels Triple Mash / Campari / wermut', price: 13 },
            { name: 'Woodford Old Fashioned', description: 'Woodford Reserve / bitters / sugar /', descriptionPolish: 'Woodford Reserve / bitter / cukier', price: 13 },
            { name: 'Botucal Daiquiri', description: 'Botucal Riserva Exclusiva / lime / sugar', descriptionPolish: 'Botucal Riserva Exclusiva / limonka / cukier', price: 13 },
        ],
        shots: [
            { name: 'Homemade Lemon Vodka', description: '', descriptionPolish: '', price: 13 },
            { name: 'Bees', description: 'Vodka / sour / Ginger Syrup', descriptionPolish: 'Wodka / sour / syrop imbirowy', price: 13 },
            { name: 'Bialy Bez', description: 'Vodka / sour / syrop z bzu', descriptionPolish: 'Wodka / sour / syrop z bzu', price: 13 },
            { name: 'Gruszka z pieprzem', description: 'Vodka / sour / pear syrup / pepper', descriptionPolish: 'Wodka / sour / syrop gruszkowy / pieprz', price: 13},
            { name: 'Kornelia', description: 'sambuca / white rum / sour / elderflower syrup', descriptionPolish: 'sambuca / bialy rum / sour / syrop z bzu', price: 13},
            { name: 'Kokaina', description: 'jagermeister / malibu / lime', descriptionPolish: 'jagermeister / malibu / limonka', price: 13},
            { name: 'Tequila & Sangrita', description: 'tequila / sangrita', descriptionPolish: 'tequila / sangrita', price: 13}
        ],
        mocktails: [
            { name: 'Aperol Spritz', description: 'Martini Vibrante 0% / Prosecco 0% / soda / orange', descriptionPolish: 'Martini Vibrante 0% / Prosecco 0% / woda gazowana / pomarancza', price: 13 },
            { name: 'Summer Sprits', description: 'Martini Floreale 0% / pineaple juice / sour / Thomas Henry Botanical Tonic / pinch of salt', descriptionPolish: 'Martini Floreale 0% / sok ananasowy / sour / Thomas Henry Botanical Tonic / szczypta soli', price: 13 },
            { name: 'Hugo', description: 'Prosecco 0% / lime / fresh mint / elderflower syrup / soda', descriptionPolish: 'Prosecco 0% / limonka / swieża mieta / syrop z bzu / woda gazowana', price: 13 },
            { name: 'Lavendula', description: 'Gin 0% / rosemary / sour / lavender syrup / tonic', descriptionPolish: 'Gin 0% / rozmaryn / sour / syrop lawendowy / tonik', price: 13 },
            { name: 'Czarno-Bialy Bez', description: 'Gin 0% / lime / elderflower syrup / elderflower jam', descriptionPolish: 'Gin 0% / limonka / syrop z bzu / konfitura z bzu', price: 13},
            { name: 'Gin Basil Smash', description: 'Gin 0% / sour / sugar / fresh basil', descriptionPolish: 'Gin 0% / sour / cukier / swieża bazylia', price: 13},
            { nmae: 'Haze 4x40 ML', description: 'homemade CBD syrup / Martini Floreale 0% / passionfruit puree / lime', descriptionPolish: 'syrop CBD własny / Martini Floreale 0% / puree z marakui / limonka', price: 13},
        ],
        softDrinks: [
            { name: 'Matcha Honey Lemonade', description: 'matcha / honey / sour', descriptionPolish: 'matcha / miód / sour', price: 13},
            { name: 'Matcha Honey Lemonade', description: 'matcha / honey / sour', descriptionPolish: 'matcha / miód / sour', price: 13},
            { name: 'Lemonade', description: 'Classic 16 PLN / Fruity 19 PLN', descriptionPolish: 'Klasyczny 16 PLN / Owocowy 19 PLN', price: 13},
            { name: 'Orange Espresso Tonic', description: 'espresso / freshly squezed orange juice / tonic', descriptionPolish: 'espresso / swieżo wyciśnięty sok z pomarańczy / tonic', price: 13},
            { name: 'Iced Matcha Late', description: 'matcha / milk(or plant milk)', descriptionPolish: 'matcha / mleko(lub mleko roslinne', price: 13}
        ],
        wine: [
            { name: 'Red Wine', type: 'red', description: 'House Selection', descriptionPolish: 'Wybór dnia', price: 13 },
            { name: 'White Wine', type: 'white', description: 'House Selection', descriptionPolish: 'Wybór dnia', price: 13 },
            { name: 'Prosecco', type: 'white', description: 'House Selection', descriptionPolish: 'Wybór dnia', price: 13 }
        ],
        hotDrinks: [
            { name: 'Japanese Plant Milk Matcha', description: 'matcha / plant milk', descriptionPolish: 'matcha / mleko roslinne', price: 13},
            { name: 'Espresso', description: '', descriptionPolish: '', price: 13 },
            { name: 'Espresso Dopio', description: '', descriptionPolish: '', price: 13 },
            { name: 'Americano', description: '', descriptionPolish: '', price: 13 },
            { name: 'Cappucino / Late', description: 'pant milk +3PLN', descriptionPolish: '', price: 13 },
            { name: 'Tea', description: 'black, green, fruity - ask at the bar / served in a teapot', descriptionPolish: 'polskie tlumaczenie', price: 13 },
            { name: 'Other', description: 'Pepsi, 7UP, Schweppes, Juices 11PLN', descriptionPolish: '', price: 13 },
            { name: 'Red Bull', description: '', descriptionPolish: '', price: 13 },
            { name: 'Bear mate', description: '330 ML', descriptionPolish: '', price: 13 },
            { name: 'Mio Mio', description: '500 ML', descriptionPolish: '', price: 13 }
        ],
        bottles: [
            { name: 'Homemade Lemon Vodka 0,5L', description: '', descriptionPolish: '', price: 13 },
            { name: 'Zubrowka 0,5 + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Bocian Vodka 0,5L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Belvedere Vodka 0,7L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Chlopska (Variety of flavors) 0,5L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Soplica (Variety of flavors) 0,5L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Jack Daniels 0,7L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'The Famous Grouse 0,7L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Kraken Black Spiced Rum 0,7L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Gibsons 0,7L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Bombay Gin 0,7L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Jose Cuervo Tequila Silver 0,7L + Soft, lime, salt', description: '', descriptionPolish: '', price: 13 },
            { name: 'Jagermeister 0,7L + Soft', description: '', descriptionPolish: '', price: 13 },
            { name: 'Jagermeister  + 5x Red Bull', description: '', descriptionPolish: '', price: 13 },
        ],
        wine: [
            { name: 'Casal Sobreiro Tinto', type: 'red', description: 'Leira, Portugal Castelao Aragonez', descriptionPolish: 'smooth, round, cassis, cherry, velvety tannins', price: 13 },
            { name: 'Cantine Ionis Julius', type: 'red', description: 'Salento, Italy Negroamaro', descriptionPolish: 'aromatic, balanced, forest fruits, mixed spice, herbs', price: 13},
            { name: 'Jaros Roble', type: 'red', description: 'Ribera del Duero, Spain Tempranillo', descriptionPolish: 'juicy, silky, blackberry, cherry, mixed spice, dark chocolate, oaked', price: 13},
            { name: 'Casal Sobreiro Branco ', type: 'white', description: 'Leira, Portugal, Fernao Pires, Moscatel', descriptionPolish: 'soft, aromatic, white flowers, tropical and citrus fruits', price: 13 },
            { name: 'DOM Charbielin C', type: 'white', description: 'Opolskie, Poland, Souvignier Gris', descriptionPolish: 'aromtic, refreshing, flowers, citrus fruits, finished with subtle acidity and swetness', price: 13},
            { name: 'S.Osvaldo', type: 'white', description: 'Veneto, Italy, Pinot Grigio', descriptionPolish: 'gentle, satisfying, white flowers, pear and apple, citrus fruits', price: 13},
            { name: 'The Tracer', type: 'white', description: 'Pfalz, Germany, Riesling', descriptionPolish: 'dry, fresh, aromatic, tropical and citrus fruits', price: 13},
            { name: 'Cantina Rauscedo', type:  'white', description: 'Friuli, Italy, Sauvignon Blanc', descriptionPolsih: 'aromatic, fresh, sage, blackcurrant, citrus fruits', price: 13},
            { name: 'Muller Gottweiger Berg', type: 'white', description: 'Kremstal, Austria, Gruner Veltliner', descriptionPolish: 'juicy, mineral, grapefruit, pear, herbs', price: 13},
            { name: 'Frizante from tap', type: 'Sparkling', description: 'Ponte Frizante Bianco, Veneto, Italy Glera', descriptionPolish: 'gentle, hint of fruits and flowers', price: 13},
            { name: 'Castel ROC Brut', type: 'Sparkling', description: 'Cava, Spain, Macabeo, Xarello, Parellada', descriptionPolsih: 'refreshing, elegant, citrus fruits, apricot, toasty', price: 13},
            
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
                        drinkItem.className = 'drink-item';
                        drinkItem.innerHTML = `
                            <img src="RedLightMenuPNGs/${getDrinkImage(section, drink.name)}" alt="${drink.name}">
                            <h3>${drink.name}</h3>
                            <p>${drink.description}</p>
                            <p class="polish">${drink.descriptionPolish}</p>
                            <p class="price">${drink.price}</p>
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
                        drinkItem.className = 'drink-item';
                        drinkItem.innerHTML = `
                            <img src="RedLightMenuPNGs/${getDrinkImage(section, drink.name)}" alt="${drink.name}">
                            <h3>${drink.name}</h3>
                            <p>${drink.description}</p>
                            <p class="polish">${drink.descriptionPolish}</p>
                            <p class="price">${drink.price}</p>
                        `;
                        grid.appendChild(drinkItem);
                    });
                }
            } else {
                drinks.forEach(drink => {
                    const drinkItem = document.createElement('div');
                    drinkItem.className = 'drink-item';
                    drinkItem.innerHTML = `
                        <img src="RedLightMenuPNGs/${getDrinkImage(section, drink.name)}" alt="${drink.name}">
                        <h3>${drink.name}</h3>
                        <p>${drink.description}</p>
                        <p class="polish">${drink.descriptionPolish}</p>
                        <p class="price">${drink.price}</p>
                    `;
                    grid.appendChild(drinkItem);
                });
            }
        });
    }

    // Function to get appropriate image for each drink
    function getDrinkImage(section, drinkName) {
        return 'testcocktail.jpg';
    }

    // Initialize drink items
    createDrinkItems();

    // Add scroll animations
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the card is in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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
        if (window.scrollY > 100) { // Show button after scrolling down 100px (adjusted for mobile)
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when the button is clicked
    backToTopBtn.addEventListener('click', () => {
        const activeSection = document.querySelector('.menu-section.active');
        if (activeSection) {
            const sectionTop = activeSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        } else {
            // Fallback to scrolling to the very top if no active section is found
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
}); 