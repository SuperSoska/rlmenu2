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
            { name: 'Pistacchio Sour', description: 'white rum / Botegga Pistacchio / amaretto / pistacchio syrop / sour / egg white', descriptionPolish: 'bialy rum / Bottega Pistacchio / amaretto / syrop pistacjowy / sour / białko jajka' },
            { name: 'Lavendula', description: 'Gibson\'s Gin / rosemary / sour/ lavendersyrup / tonic', descriptionPolish: 'Gibson\'s Gin / rozmaryn / sour / syrop lawendowy / tonik' },
            { name: 'Czarno-Bialy Bez', description: 'Gibson\'s Gin/elderberry jam / elderflower syrup / lime', descriptionPolish: 'Gibson\'s Gin konfitura N bzu syrop z bzu A limonka' },
            { name: 'Red Light', description: 'vodka / pomegranate juice / 7up / lime / brown sugar / grenadine', descriptionPolish: 'wodka / sok z granatu / 7up / limonka / brazowy cukier / grenadyna' },
            { name: 'Alamo', description: 'bourbon / tequila habanero / lime / honey / cherry syrup', descriptionPolish: 'bourbon / tequila habanero / limonka / miód / syrop wiśniowy' },
            { name: 'Chit-Chat', description: 'Jose Cuervo Reposado / lime / pomegranate molasses / agave syrup / clitoria / rhubarb bitters', descriptionPolish: 'Jose Cuervo Reposado / limonka / melasa z granatu / syropzagawy / klitoria / bitter rabarbarowy' }
        ],
        krakenCocktails: [
            { name: 'Golden Kornelia', description: 'Kraken Black Spiced Rum / irish cream / vanilla syrup / cinnamon syrup / cream / milk', descriptionPolish: 'Kraken Black Spiced Rum / irish cream / syrop waniliowy / syropcynamonowy / śmietanka / mleko' },
            { name: 'Smokey Beast', description: 'Kraken Black Spiced Rum / vermouth / smoked whisky / Amaro Montenegro / biters', descriptionPolish: 'Kraken Black Spiced Rum / wermut / dymna whisky / Amaro Montenegro / bitter' },
            { name: 'Kraken Perry', description: 'Kraken Black Spiced Rum / Metaxa / pear syrup / sour / rosemary', descriptionPolish: 'Kraken Black Spiced Rum / Metaxa / syrop gruszkowy / sour/ rozmaryn' },
            { name: 'Chocolate Bay', description: 'Kraken Black Spiced Rum / coffee liquor / freshly squeezed orange juice / chocolate syrup / sour', descriptionPolish: 'Kraken Black Spiced Rum / likier kawowy / swieży sok z pomarańczy / syrop czekoladowy / sour' },
            { name: 'Dark and Stormy', description: 'Kraken Black Spiced Rum / ginger beer / lime', descriptionPolish: 'Kraken Black Spiced Rum / piwo imbirowe / limonka' },
            { name: 'Old Cuban', description: 'Kraken Black Spiced Rum / lime / sugar / Cava / biters / mint', descriptionPolish: 'Kraken Black Spiced Rum / limonka / cukier / Cava / bitter / mieta' }
        ],
        classicCocktails: [
            { name: 'Pornstar Martini', description: 'vodka / passion fruit puree / lime / Cava', descriptionPolish: 'wodka / puree z marakui / limonka / Cava' },
            { name: 'Bergamot Negroni', description: 'Italicus / gin / Campari / vermouth', descriptionPolish: 'Italicus / gin / Campari / wermut' },
            { name: 'Whisky Sour', description: 'Evan Williams Kentucky Straight Bourbon / sour / maple syrup / bitters / egg white', descriptionPolish: 'Evan Williams Kentucky Straight Bourbon / sour / syrop klonowy / bitter / bialko jajka' },
            { name: 'Pisco Sour', description: 'Pisco / lime / agave syrup / egg white / cardamon bitters', descriptionPolish: 'Pisco / limonka / syrop z agawy / bialko jajka / bitter kardamonowy' },
            { name: 'Long Island Iced Tea', description: 'vodka / Jose Cuervo Silver / rum / Gibson\'s Gin / Archers / sour / pepsi', descriptionPolish: 'wódka / Jose Cuervo Silver / rum / Gibson\'s Gin / Archers / sour/ pepsi' },
            { name: 'Bramble', description: 'Gibson\'s Gin / Chambord / sour / sugar', descriptionPolish: 'Gibson\'s Gin / Chambord / sour / cukier' }
        ],
        jackDanielsCocktails: [
            { name: 'Lynchbourg Lemonade', description: 'Jack Daniel\'s / Cointreau / sour / sugar / 7up', descriptionPolish: 'Jack Daniel\'s / Cointreau / sour / cukier / 7up' },
            { name: 'Gin Basil Smash', description: 'Gin Mare / fresh basil / lime / sugar', descriptionPolish: 'Gin Mare / swieża bazylia / limonka / cukier' },
            { name: 'Penicilin', description: 'Benriach Smoky 10yo / ginger-honey syrup / sour', descriptionPolish: 'Benriach Smoky 10yo / syrop miodowo - imbirowy / sour' },
            { name: 'Gimlet', description: 'Ford\'s Gin / lime 1 sugar', descriptionPolish: 'Ford\'s Gin / limonka / cukier' },
            { name: 'Boulvardier', description: 'Jack Daniels Triple Mash / Campari / vermouth', descriptionPolish: 'Jack Daniels Triple Mash / Campari / wermut' }
        ],
        shots: [
            { name: 'B-52', description: 'Kahlua / Baileys / Grand Marnier', descriptionPolish: 'Kahlua / Baileys / Grand Marnier' },
            { name: 'Jagerbomb', description: 'Jägermeister / Red Bull', descriptionPolish: 'Jägermeister / Red Bull' }
        ],
        mocktails: [
            { name: 'Virgin Mojito', description: 'lime / mint / sugar / soda', descriptionPolish: 'limonka / mięta / cukier / woda sodowa' },
            { name: 'Virgin Pina Colada', description: 'pineapple juice / coconut milk / cream', descriptionPolish: 'sok ananasowy / mleko kokosowe / śmietanka' }
        ],
        softDrinks: [
            { name: 'Coca Cola', description: 'Coca Cola', descriptionPolish: 'Coca Cola' },
            { name: 'Sprite', description: 'Sprite', descriptionPolish: 'Sprite' },
            { name: 'Fanta', description: 'Fanta', descriptionPolish: 'Fanta' }
        ],
        hotDrinks: [
            { name: 'Hot Chocolate', description: 'Hot Chocolate', descriptionPolish: 'Hot Chocolate' },
            { name: 'Coffee', description: 'Coffee', descriptionPolish: 'Coffee' },
            { name: 'Tea', description: 'Tea', descriptionPolish: 'Tea' }
        ],
        bottles: [
            { name: 'Water', description: 'Water', descriptionPolish: 'Woda' },
            { name: 'Soda', description: 'Soda', descriptionPolish: 'Soda' },
            { name: 'Beer', description: 'Beer', descriptionPolish: 'Piwo' }
        ],
        wine: [
            { name: 'Red Wine', description: 'House Selection', descriptionPolish: 'Wybór dnia' },
            { name: 'White Wine', description: 'House Selection', descriptionPolish: 'Wybór dnia' },
            { name: 'Prosecco', description: 'House Selection', descriptionPolish: 'Wybór dnia' }
        ]
    };

    // Function to create drink items
    function createDrinkItems() {
        Object.entries(drinksData).forEach(([section, drinks]) => {
            const sectionElement = document.getElementById(section);
            if (!sectionElement) return;
            const grid = sectionElement.querySelector('.drinks-grid');
            
            drinks.forEach(drink => {
                const drinkItem = document.createElement('div');
                drinkItem.className = 'drink-item';
                drinkItem.innerHTML = `
                    <img src="RedLightMenuPNGs/${getDrinkImage(section, drink.name)}" alt="${drink.name}">
                    <h3>${drink.name}</h3>
                    <p>${drink.description}</p>
                    <p class="polish">${drink.descriptionPolish}</p>
                `;
                grid.appendChild(drinkItem);
            });
        });
    }

    // Function to get appropriate image for each drink
    function getDrinkImage(section, drinkName) {
        return 'czarnogpt.png';
    }

    // Initialize drink items
    createDrinkItems();

    // Add scroll animations
    const observerOptions = {
        threshold: 1.0 // Only trigger when the whole card is in view
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
}); 