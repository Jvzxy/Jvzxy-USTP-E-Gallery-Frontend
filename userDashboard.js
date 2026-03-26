var myCarousel = document.getElementById('featuredCarousel')
myCarousel.addEventListener('slide.bs.carousel', function (e) {
    let dots = document.querySelectorAll('.carousel-indicators-custom .dot-sm');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[e.to].classList.add('active');
})



function showSection(sectionId, navElement) {
    // 1. Hide EVERY possible main container to ensure no overlapping
    const sections = ['home', 'latin-honor', 'departments', 'section-view', 'student-grid-view'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 2. Show the one you clicked from the Nav
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';

    // 3. Update Active Nav Class
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if (navElement) navElement.classList.add('active');
}

const programAbbreviations = {
    "BS Civil Engineering": "CE", "BS Electronic Engineering": "ECE", "BS Electrical Engineering": "EE",
    "BS Environment Engineering": "EnE", "BS Computer Engineering": "CpE", "BS Agricultural and Biosystems Engineering": "ABE",
    "BS Mechanical Engineering": "ME", "BS Naval Architecture and Marine Engineering": "NAME", "BS Geodetic Engineering": "GE",
    "BS Computer Science": "CS", "BS Data Science": "DS", "BS Technology Communication Management": "TCM", "BS Information Technology": "IT",
    "BS Agricultural Technology": "AgTech", "BS Autotronics": "Auto", "BS Electro-Mechanical": "EM",
    "BS Electronics Technology": "EST", "BS Energy System and Management": "ESM", "BS Food Processing and Management": "FPM",
    "BS Manufacturing Engineering Technology": "MET", "BS Agricultural": "Agri", "BS Agroforestry": "AF", "BS Horticulture and Management": "HM", 
    "BS Marine Biology": "MarBio", "BS Applied Mathematics": "AM", "BS Applied Physics": "AP", "BS Chemistry": "Chem",
    "BS Environmental Science": "ES", "BS Secondary Education (major in Mathematics)": "SEM", "BS Secondary Education (major in Science)": "SES",
    "BS Social Work": "SW", "BS Technical-Vocational Teacher": "TVT",
    "BS Technology and Livelihood Education (major in Industrial Arts, Home Economics)": "TLE", "BS Architecture": "Archi"
};

function renderSections(programName) {
    // 1. Identify which modal is currently open and close it
    const activeModal = document.querySelector('.modal.show');
    if (activeModal) {
        const modal = bootstrap.Modal.getInstance(activeModal);
        modal.hide();
    }

    // 2. Hide the main departments container and show the section view
    document.getElementById('departments').style.display = 'none';
    document.getElementById('section-view').style.display = 'block';

    // 3. Get the code (e.g., "CE") from the abbreviations list
    const abbr = programAbbreviations[programName] || "N/A";

    // 4. Generate the 9 section cards
    const grid = document.getElementById('section-grid');
    grid.innerHTML = ""; // Clear previous sections

    for (let i = 1; i <= 9; i++) {
        grid.innerHTML += `
            <div class="col-md-4">
                <div class="section-card" onclick="openClassYear('${abbr}-4R${i}')">
                    <div class="section-blur-overlay">
                        <h4 class="fw-bold m-0">${abbr}-4R${i}</h4>
                    </div>
                </div>
            </div>`;
    }
}

// Function to go back to departments
function goBackToDepartments() {
    document.getElementById('section-view').style.display = 'none';
    document.getElementById('departments').style.display = 'block';
}




function openClassYear(sectionCode) {
    // 1. Hide ALL other views
    document.getElementById('home').style.display = 'none';
    document.getElementById('latin-honor').style.display = 'none';
    document.getElementById('departments').style.display = 'none';
    document.getElementById('section-view').style.display = 'none';
    
    // 2. Show the Student Grid and Add Animation Class
    const gridView = document.getElementById('student-grid-view');
    gridView.style.display = 'block';
    gridView.classList.add('fade-in-up'); // Added the animation here

    // 3. Set the Title
    document.getElementById('current-section-title').innerText = sectionCode;

    // 4. Generate Students
    const container = document.getElementById('student-container');
    container.innerHTML = ""; 

    for (let i = 1; i <= 10; i++) {
        const studentName = i % 2 === 0 ? "MOLO, KAIROS" : "DURAIN, JUSSY JAY G.";
        const studentQuote = i % 2 === 0 ? "I love cats" : "D.F.Q";

        container.innerHTML += `
            <div class="col-6 col-md-2-4 mb-4">
                <div class="honor-profile text-center">
                    <img src="/src/img/student/Durain.jpg" class="mb-2" alt="Student">
                    <div class="px-1">
                        <small class="fw-bold text-uppercase d-block" style="font-size: 0.7rem;">${studentName}</small>
                        <small class="d-block" style="font-size: 0.65rem; font-style: italic;">"${studentQuote}"</small>
                    </div>
                </div>
            </div>`;
    }
}

function goBackToSections() {
    const gridView = document.getElementById('student-grid-view');
    gridView.style.display = 'none';
    gridView.classList.remove('fade-in-up'); // Reset animation for next time
    document.getElementById('section-view').style.display = 'block';
}

// Ensure the script runs after the HTML is ready
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-latin');
    
    // Only add the listener if the search input exists on this page
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const grid = document.getElementById('latin-grid');
            const cards = grid.querySelectorAll('.col-6, .col-md-2-4');
            const noResults = document.getElementById('no-results');
            
            let visibleCount = 0;

            cards.forEach(card => {
                const nameElement = card.querySelector('.fw-bold.text-uppercase');
                if (nameElement) {
                    const studentName = nameElement.innerText.toLowerCase();
                    
                    if (studentName.includes(searchTerm)) {
                        card.style.setProperty('display', '', 'important'); 
                        card.classList.add('fade-in-up');
                        visibleCount++;
                    } else {
                        card.style.setProperty('display', 'none', 'important');
                    }
                }
            });

            // Toggle "No Results" based on search count
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                grid.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                grid.style.display = 'flex';
            }
        });
    }
});

