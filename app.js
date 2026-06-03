// EduQuiz INF.02 - Główny plik logiki (app.js)

document.addEventListener('DOMContentLoaded', () => {
    // === STAN APLIKACJI ===
    const state = {
        activeTab: 'practice', // 'practice' | 'exam' | 'browse'
        theme: 'dark', // 'dark' | 'light'
        categoryFilter: 'all',
        searchQuery: '',
        
        // Statystyki
        learnedProgress: new Set(), // Zbiór ID poprawnie odpowiedzianych pytań w trybie nauki
        examHistory: [], // Lista historycznych wyników egzaminów
        
        // Nauka (Szybka Praktyka)
        practice: {
            filteredQuestions: [],
            currentIndex: 0,
            selectedOption: null,
            isChecked: false
        },
        
        // Egzamin
        exam: {
            isActive: false,
            questions: [], // 40 wylosowanych pytań
            userAnswers: [], // 40 odpowiedzi użytkownika (A, B, C, D lub null)
            currentIndex: 0,
            timeRemaining: 3600, // 60 minut w sekundach
            timerInterval: null,
            durationSecondsUsed: 0,
            reviewFilter: 'all' // 'all' | 'correct' | 'incorrect'
        }
    };

    // Tłumaczenia kategorii do wyświetlenia na plakietkach
    const categoryTranslations = {
        networking: 'Sieci komputerowe',
        operating_systems: 'Systemy operacyjne',
        hardware: 'Sprzęt i montaż',
        security_law: 'Bezpieczeństwo i prawo',
        logic_math: 'Logika i obliczenia',
        other: 'Inne'
    };

    // === CACHE ELEMENTÓW DOM ===
    const el = {
        html: document.documentElement,
        themeToggleBtn: document.getElementById('themeToggleBtn'),
        learnedCount: document.getElementById('learnedCount'),
        avgExamScore: document.getElementById('avgExamScore'),
        
        // Nawigacja
        tabs: {
            practice: document.getElementById('tabPractice'),
            exam: document.getElementById('tabExam'),
            browse: document.getElementById('tabBrowse')
        },
        sections: {
            practice: document.getElementById('sectionPractice'),
            exam: document.getElementById('sectionExam'),
            browse: document.getElementById('sectionBrowse')
        },
        
        // Filtry i wyszukiwanie
        controlsPanel: document.getElementById('controlsPanel'),
        categoryFilter: document.getElementById('categoryFilter'),
        searchInput: document.getElementById('searchInput'),
        clearSearchBtn: document.getElementById('clearSearchBtn'),
        resetProgressBtn: document.getElementById('resetProgressBtn'),
        
        // Sekcja Nauka
        practiceProgressBar: document.getElementById('practiceProgressBar'),
        currentPracticeIndex: document.getElementById('currentPracticeIndex'),
        totalPracticeCount: document.getElementById('totalPracticeCount'),
        practiceQuestionCard: document.getElementById('practiceQuestionCard'),
        practiceCategoryBadge: document.getElementById('practiceCategoryBadge'),
        practiceQuestionId: document.getElementById('practiceQuestionId'),
        practiceQuestionText: document.getElementById('practiceQuestionText'),
        practiceOptionsContainer: document.getElementById('practiceOptionsContainer'),
        practiceExplanationBox: document.getElementById('practiceExplanationBox'),
        explanationStatusIcon: document.getElementById('explanationStatusIcon'),
        explanationStatusText: document.getElementById('explanationStatusText'),
        practiceExplanationText: document.getElementById('practiceExplanationText'),
        btnCheckAnswer: document.getElementById('btnCheckAnswer'),
        btnNextQuestion: document.getElementById('btnNextQuestion'),
        
        // Sekcja Egzamin
        examStartContainer: document.getElementById('examStartContainer'),
        btnStartExam: document.getElementById('btnStartExam'),
        examActiveContainer: document.getElementById('examActiveContainer'),
        examTimer: document.getElementById('examTimer'),
        answeredExamCount: document.getElementById('answeredExamCount'),
        btnFinishExam: document.getElementById('btnFinishExam'),
        examCategoryBadge: document.getElementById('examCategoryBadge'),
        examDisplayIndex: document.getElementById('examDisplayIndex'),
        examQuestionText: document.getElementById('examQuestionText'),
        examOptionsContainer: document.getElementById('examOptionsContainer'),
        btnPrevExam: document.getElementById('btnPrevExam'),
        btnNextExam: document.getElementById('btnNextExam'),
        examNavGrid: document.getElementById('examNavGrid'),
        
        // Wyniki Egzaminu
        examResultsContainer: document.getElementById('examResultsContainer'),
        resultsSummaryCard: document.getElementById('resultsSummaryCard'),
        resultEmoji: document.getElementById('resultEmoji'),
        resultTitle: document.getElementById('resultTitle'),
        resultScoreValue: document.getElementById('resultScoreValue'),
        resultScorePercent: document.getElementById('resultScorePercent'),
        resultSubtext: document.getElementById('resultSubtext'),
        resultTimeValue: document.getElementById('resultTimeValue'),
        resultDateValue: document.getElementById('resultDateValue'),
        btnRestartExam: document.getElementById('btnRestartExam'),
        btnShowExamReview: document.getElementById('btnShowExamReview'),
        examReviewSection: document.getElementById('examReviewSection'),
        btnFilterReviewAll: document.getElementById('btnFilterReviewAll'),
        btnFilterReviewCorrect: document.getElementById('btnFilterReviewCorrect'),
        btnFilterReviewIncorrect: document.getElementById('btnFilterReviewIncorrect'),
        reviewQuestionsList: document.getElementById('reviewQuestionsList'),
        
        // Sekcja Przeglądaj
        browseMatchCount: document.getElementById('browseMatchCount'),
        browseQuestionsList: document.getElementById('browseQuestionsList')
    };

    // === INICJALIZACJA APLIKACJI ===
    function init() {
        loadLocalStorageData();
        setupTheme();
        bindEvents();
        updateMiniStats();
        switchTab('practice'); // Domyślna zakładka
    }

    // === EVENT BINDINGS ===
    function bindEvents() {
        // Zmiana motywu
        el.themeToggleBtn.addEventListener('click', toggleTheme);
        
        // Nawigacja zakładkami
        Object.entries(el.tabs).forEach(([tabName, tabBtn]) => {
            tabBtn.addEventListener('click', () => switchTab(tabName));
        });
        
        // Filtrowanie i wyszukiwanie
        el.categoryFilter.addEventListener('change', (e) => {
            state.categoryFilter = e.target.value;
            handleFiltersChange();
        });
        
        el.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase().trim();
            el.clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
            handleFiltersChange();
        });
        
        el.clearSearchBtn.addEventListener('click', () => {
            el.searchInput.value = '';
            state.searchQuery = '';
            el.clearSearchBtn.style.display = 'none';
            handleFiltersChange();
        });

        el.resetProgressBtn.addEventListener('click', confirmResetProgress);
        
        // Logika Nauki (Praktyki)
        el.btnCheckAnswer.addEventListener('click', checkPracticeAnswer);
        el.btnNextQuestion.addEventListener('click', nextPracticeQuestion);
        
        // Logika Egzaminu
        el.btnStartExam.addEventListener('click', startExam);
        el.btnFinishExam.addEventListener('click', () => {
            if (confirm('Czy na pewno chcesz zakończyć egzamin i wysłać arkusz odpowiedzi?')) {
                finishExam();
            }
        });
        el.btnPrevExam.addEventListener('click', prevExamQuestion);
        el.btnNextExam.addEventListener('click', nextExamQuestion);
        el.btnRestartExam.addEventListener('click', () => {
            switchTab('exam');
            startExam();
        });
        el.btnShowExamReview.addEventListener('click', () => {
            el.examReviewSection.style.display = 'block';
            el.examReviewSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Filtry przeglądu egzaminu
        el.btnFilterReviewAll.addEventListener('click', () => setReviewFilter('all'));
        el.btnFilterReviewCorrect.addEventListener('click', () => setReviewFilter('correct'));
        el.btnFilterReviewIncorrect.addEventListener('click', () => setReviewFilter('incorrect'));
    }

    // === OBSŁUGA MOTYWÓW ===
    function setupTheme() {
        el.html.setAttribute('data-theme', state.theme);
    }

    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        el.html.setAttribute('data-theme', state.theme);
        try {
            localStorage.setItem('theme', state.theme);
        } catch (e) {
            console.warn("localStorage jest niedostępne:", e);
        }
    }

    // === LOCAL STORAGE & STATS ===
    function loadLocalStorageData() {
        let savedTheme = null;
        let savedLearned = null;
        let savedHistory = null;
        
        try {
            savedTheme = localStorage.getItem('theme');
            savedLearned = localStorage.getItem('learnedProgress');
            savedHistory = localStorage.getItem('examHistory');
        } catch (e) {
            console.warn("Brak dostępu do localStorage (np. przez protokół file:///):", e);
        }
        
        // Motyw
        if (savedTheme === 'light' || savedTheme === 'dark') {
            state.theme = savedTheme;
        } else {
            // Domyślnie bierzemy ciemny, ale sprawdzamy preferencje systemowe
            const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
            state.theme = prefersLight ? 'light' : 'dark';
        }
        
        // Postęp nauki (Zbiór poprawnych ID)
        if (savedLearned) {
            try {
                const ids = JSON.parse(savedLearned);
                state.learnedProgress = new Set(ids);
            } catch (e) {
                console.error("Błąd odczytu postępu nauki:", e);
                state.learnedProgress = new Set();
            }
        }
        
        // Historia egzaminów
        if (savedHistory) {
            try {
                state.examHistory = JSON.parse(savedHistory);
            } catch (e) {
                console.error("Błąd odczytu historii egzaminów:", e);
                state.examHistory = [];
            }
        }
    }

    function saveLearnedProgress() {
        try {
            localStorage.setItem('learnedProgress', JSON.stringify(Array.from(state.learnedProgress)));
        } catch (e) {
            console.warn("Nie można zapisać postępu w localStorage:", e);
        }
    }

    function saveExamHistory() {
        try {
            localStorage.setItem('examHistory', JSON.stringify(state.examHistory));
        } catch (e) {
            console.warn("Nie można zapisać historii egzaminów w localStorage:", e);
        }
    }

    function updateMiniStats() {
        // Licznik opanowanych pytań (maksymalnie 65)
        const count = state.learnedProgress.size;
        el.learnedCount.textContent = `${count}/65`;
        
        // Średni wynik egzaminów
        if (state.examHistory.length > 0) {
            const sum = state.examHistory.reduce((acc, curr) => acc + curr.percentage, 0);
            const avg = Math.round(sum / state.examHistory.length);
            el.avgExamScore.textContent = `${avg}%`;
        } else {
            el.avgExamScore.textContent = '0%';
        }
    }

    function confirmResetProgress() {
        if (confirm('Czy na pewno chcesz wyczyścić wszystkie statystyki, historię egzaminów oraz postęp nauki? Te dane zostaną bezpowrotnie usunięte.')) {
            state.learnedProgress.clear();
            state.examHistory = [];
            saveLearnedProgress();
            saveExamHistory();
            updateMiniStats();
            alert('Wyczyszczono statystyki.');
            
            // Odśwież bieżącą zakładkę
            if (state.activeTab === 'practice') {
                initPractice();
            } else if (state.activeTab === 'browse') {
                initBrowse();
            }
        }
    }

    // === TAB NAVIGATOR ===
    function switchTab(tabName) {
        // Przerwij aktywny egzamin, jeśli użytkownik zmienia zakładkę
        if (state.exam.isActive && tabName !== 'exam') {
            if (!confirm('Egzamin jest w toku. Wyjście spowoduje anulowanie egzaminu. Czy chcesz kontynuować?')) {
                return;
            }
            abortExam();
        }
        
        state.activeTab = tabName;
        
        // Aktualizacja klas przycisków
        Object.entries(el.tabs).forEach(([name, btn]) => {
            btn.classList.toggle('active', name === tabName);
        });
        
        // Pokazywanie/ukrywanie sekcji
        Object.entries(el.sections).forEach(([name, section]) => {
            section.classList.toggle('active', name === tabName);
        });
        
        // Panel filtrów widoczny tylko w trybie Nauki oraz Przeglądania
        if (tabName === 'practice' || tabName === 'browse') {
            el.controlsPanel.style.display = 'flex';
        } else {
            el.controlsPanel.style.display = 'none';
        }
        
        // Uruchomienie inicjalizacji danej sekcji
        if (tabName === 'practice') {
            initPractice();
        } else if (tabName === 'exam') {
            initExamSetup();
        } else if (tabName === 'browse') {
            initBrowse();
        }
    }

    function handleFiltersChange() {
        if (state.activeTab === 'practice') {
            initPractice();
        } else if (state.activeTab === 'browse') {
            initBrowse();
        }
    }

    // === FILTRACJA PYTAŃ (Sieci, Systemy, etc.) ===
    function getFilteredQuestions() {
        return QUESTIONS.filter(q => {
            // Kategoria
            const matchCategory = state.categoryFilter === 'all' || q.category === state.categoryFilter;
            
            // Szukana fraza w pytaniu lub opcjach
            let matchSearch = true;
            if (state.searchQuery) {
                const qText = q.question.toLowerCase();
                const oText = q.options.map(o => o.text.toLowerCase()).join(' ');
                matchSearch = qText.includes(state.searchQuery) || oText.includes(state.searchQuery);
            }
            
            return matchCategory && matchSearch;
        });
    }

    // === TRYB NAUKI (PRACTICE) LOGIKA ===
    function initPractice() {
        const filtered = getFilteredQuestions();
        state.practice.filteredQuestions = filtered;
        state.practice.currentIndex = 0;
        state.practice.selectedOption = null;
        state.practice.isChecked = false;
        
        el.totalPracticeCount.textContent = filtered.length;
        
        if (filtered.length === 0) {
            renderNoQuestionsFound();
        } else {
            renderPracticeQuestion();
        }
    }

    function renderNoQuestionsFound() {
        el.practiceProgressBar.style.width = '0%';
        el.currentPracticeIndex.textContent = '0';
        
        el.practiceQuestionCard.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                <h3>Brak pytań pasujących do filtrów</h3>
                <p style="margin-top: 8px; font-size: 14px;">Spróbuj zmienić kategorię lub wyczyścić wyszukiwarkę.</p>
            </div>
        `;
    }

    function renderPracticeQuestion() {
        const q = state.practice.filteredQuestions[state.practice.currentIndex];
        if (!q) return;
        
        state.practice.selectedOption = null;
        state.practice.isChecked = false;
        
        // Zmień nagłówek karty
        el.practiceCategoryBadge.className = `category-badge ${q.category}`;
        el.practiceCategoryBadge.textContent = categoryTranslations[q.category] || q.category;
        el.practiceQuestionId.textContent = `#${q.id}`;
        
        // Treść pytania
        el.practiceQuestionText.textContent = q.question;
        
        // Renderuj opcje
        el.practiceOptionsContainer.innerHTML = '';
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.dataset.letter = opt.letter;
            
            const letterSpan = document.createElement('span');
            letterSpan.className = 'option-letter';
            letterSpan.textContent = opt.letter;
            
            const textSpan = document.createElement('span');
            textSpan.className = 'option-text';
            textSpan.textContent = opt.text;
            
            btn.appendChild(letterSpan);
            btn.appendChild(textSpan);
            
            btn.addEventListener('click', () => selectPracticeOption(opt.letter));
            
            el.practiceOptionsContainer.appendChild(btn);
        });
        
        // Ukryj wyjaśnienie i zmień stan przycisków
        el.practiceExplanationBox.style.display = 'none';
        el.btnCheckAnswer.style.display = 'inline-flex';
        el.btnCheckAnswer.disabled = true;
        el.btnNextQuestion.style.display = 'none';
        
        // Aktualizuj pasek postępu
        const progressPercent = (state.practice.currentIndex / state.practice.filteredQuestions.length) * 100;
        el.practiceProgressBar.style.width = `${progressPercent}%`;
        el.currentPracticeIndex.textContent = state.practice.currentIndex + 1;
    }

    function selectPracticeOption(letter) {
        if (state.practice.isChecked) return; // Zablokuj po sprawdzeniu
        
        state.practice.selectedOption = letter;
        
        // Aktualizuj klasy
        const optionBtns = el.practiceOptionsContainer.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.letter === letter);
        });
        
        el.btnCheckAnswer.disabled = false;
    }

    function checkPracticeAnswer() {
        if (state.practice.isChecked || !state.practice.selectedOption) return;
        
        const q = state.practice.filteredQuestions[state.practice.currentIndex];
        const selected = state.practice.selectedOption;
        const correct = q.correct_option;
        
        state.practice.isChecked = true;
        
        // Aktualizuj klasy opcji na poprawne/błędne
        const optionBtns = el.practiceOptionsContainer.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.remove('selected');
            btn.classList.add('checked');
            
            if (btn.dataset.letter === correct) {
                btn.classList.add('correct');
            } else if (btn.dataset.letter === selected) {
                btn.classList.add('incorrect');
            }
        });
        
        // Zapisz postęp nauki
        const isCorrect = selected === correct;
        if (isCorrect) {
            state.learnedProgress.add(q.id);
            saveLearnedProgress();
            updateMiniStats();
        }
        
        // Wyświetl wyjaśnienie
        el.practiceExplanationBox.className = `explanation-box ${isCorrect ? 'correct' : 'incorrect'}`;
        el.explanationStatusIcon.textContent = isCorrect ? '🎉' : '❌';
        el.explanationStatusText.textContent = isCorrect ? 'Prawidłowa odpowiedź!' : `Błędna odpowiedź. Poprawna to ${correct}.`;
        
        // Jeśli w bazie brak wyjaśnienia (zazwyczaj uzupełniliśmy), wstaw zapasowe
        el.practiceExplanationText.textContent = q.explanation || "Brak szczegółowego opisu dla tego pytania.";
        el.practiceExplanationBox.style.display = 'flex';
        
        // Przełącz przyciski akcji
        el.btnCheckAnswer.style.display = 'none';
        el.btnNextQuestion.style.display = 'inline-flex';
        
        // Ustaw pełny pasek postępu, jeśli to ostatnie pytanie
        if (state.practice.currentIndex === state.practice.filteredQuestions.length - 1) {
            el.practiceProgressBar.style.width = '100%';
        }
    }

    function nextPracticeQuestion() {
        state.practice.currentIndex++;
        
        if (state.practice.currentIndex >= state.practice.filteredQuestions.length) {
            // Ukończono całą kategorię!
            renderPracticeFinished();
        } else {
            renderPracticeQuestion();
        }
    }

    function renderPracticeFinished() {
        el.practiceQuestionCard.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; display: flex; flex-direction: column; gap: 20px; align-items: center;">
                <div style="font-size: 64px; animation: bounce 1s infinite alternate ease-in-out;">🏆</div>
                <h2>Świetna robota!</h2>
                <p style="color: var(--text-secondary); max-width: 500px; font-size: 15px; line-height: 1.6;">
                    Ukończyłeś wszystkie pytania (${state.practice.filteredQuestions.length}) w tej sekcji. Twój postęp nauki został zapisany.
                </p>
                <div style="display: flex; gap: 12px; margin-top: 10px;">
                    <button class="btn btn-primary" id="btnRestartPractice">Rozpocznij od nowa</button>
                    <button class="btn btn-secondary" id="btnGoToExam">Przejdź do Egzaminu</button>
                </div>
            </div>
        `;
        
        document.getElementById('btnRestartPractice').addEventListener('click', () => {
            initPractice();
        });
        document.getElementById('btnGoToExam').addEventListener('click', () => {
            switchTab('exam');
        });
    }

    // === TRYB EGZAMINU (EXAM) LOGIKA ===
    function initExamSetup() {
        // Resetujemy widoki
        el.examStartContainer.style.display = 'block';
        el.examActiveContainer.style.display = 'none';
        el.examResultsContainer.style.display = 'none';
        
        abortExam(); // upewnij się, że nie ma uruchomionego timera
    }

    function startExam() {
        state.exam.isActive = true;
        state.exam.currentIndex = 0;
        state.exam.timeRemaining = 3600; // 60 minut
        state.exam.durationSecondsUsed = 0;
        state.exam.userAnswers = new Array(40).fill(null);
        
        // Wylosuj 40 pytań z pełnej bazy 65 pytań
        const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
        state.exam.questions = shuffled.slice(0, 40);
        
        // Pokaż UI aktywnego egzaminu
        el.examStartContainer.style.display = 'none';
        el.examResultsContainer.style.display = 'none';
        el.examActiveContainer.style.display = 'block';
        
        // Inicjalizacja zegara
        updateTimerDisplay();
        state.exam.timerInterval = setInterval(() => {
            state.exam.timeRemaining--;
            state.exam.durationSecondsUsed++;
            updateTimerDisplay();
            
            if (state.exam.timeRemaining <= 0) {
                clearInterval(state.exam.timerInterval);
                alert('Czas minął! Twój egzamin zostanie automatycznie zakończony.');
                finishExam();
            }
        }, 1000);
        
        // Renderuj pierwsze pytanie i siatkę nawigacyjną
        renderExamQuestion();
        renderExamNavGrid();
        updateExamProgress();
    }

    function abortExam() {
        state.exam.isActive = false;
        if (state.exam.timerInterval) {
            clearInterval(state.exam.timerInterval);
            state.exam.timerInterval = null;
        }
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(state.exam.timeRemaining / 60);
        const seconds = state.exam.timeRemaining % 60;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        el.examTimer.textContent = `Pozostały czas: ${formattedTime}`;
        
        // Ostrzeżenie na czerwono, jeśli zostało mniej niż 5 minut
        if (state.exam.timeRemaining < 300) {
            el.examTimer.style.color = 'var(--danger)';
        } else {
            el.examTimer.style.color = 'var(--warning)';
        }
    }

    function updateExamProgress() {
        const answeredCount = state.exam.userAnswers.filter(ans => ans !== null).length;
        el.answeredExamCount.textContent = answeredCount;
    }

    function renderExamQuestion() {
        const q = state.exam.questions[state.exam.currentIndex];
        if (!q) return;
        
        // Badges
        el.examCategoryBadge.className = `category-badge ${q.category}`;
        el.examCategoryBadge.textContent = categoryTranslations[q.category] || q.category;
        el.examDisplayIndex.textContent = state.exam.currentIndex + 1;
        
        // Treść pytania
        el.examQuestionText.textContent = q.question;
        
        // Render opcji
        el.examOptionsContainer.innerHTML = '';
        const currentAnswer = state.exam.userAnswers[state.exam.currentIndex];
        
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `option-btn ${currentAnswer === opt.letter ? 'selected' : ''}`;
            btn.dataset.letter = opt.letter;
            
            const letterSpan = document.createElement('span');
            letterSpan.className = 'option-letter';
            letterSpan.textContent = opt.letter;
            
            const textSpan = document.createElement('span');
            textSpan.className = 'option-text';
            textSpan.textContent = opt.text;
            
            btn.appendChild(letterSpan);
            btn.appendChild(textSpan);
            
            btn.addEventListener('click', () => selectExamOption(opt.letter));
            
            el.examOptionsContainer.appendChild(btn);
        });
        
        // Stan przycisków nawigacji
        el.btnPrevExam.disabled = state.exam.currentIndex === 0;
        el.btnNextExam.disabled = state.exam.currentIndex === 39;
        
        // Podświetl element w siatce nawigacyjnej
        updateExamNavGridActive();
    }

    function selectExamOption(letter) {
        state.exam.userAnswers[state.exam.currentIndex] = letter;
        
        // Wizualnie zaznacz
        const optionBtns = el.examOptionsContainer.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.letter === letter);
        });
        
        // Aktualizuj siatkę nawigacyjną i postęp
        renderExamNavGrid();
        updateExamProgress();
    }

    function prevExamQuestion() {
        if (state.exam.currentIndex > 0) {
            state.exam.currentIndex--;
            renderExamQuestion();
        }
    }

    function nextExamQuestion() {
        if (state.exam.currentIndex < 39) {
            state.exam.currentIndex++;
            renderExamQuestion();
        }
    }

    function renderExamNavGrid() {
        el.examNavGrid.innerHTML = '';
        for (let i = 0; i < 40; i++) {
            const item = document.createElement('div');
            item.className = 'exam-grid-item';
            item.textContent = i + 1;
            
            // Sprawdź czy odpowiedziano
            if (state.exam.userAnswers[i] !== null) {
                item.classList.add('answered');
            }
            
            // Sprawdź czy to obecne
            if (i === state.exam.currentIndex) {
                item.classList.add('current');
            }
            
            item.addEventListener('click', () => {
                state.exam.currentIndex = i;
                renderExamQuestion();
            });
            
            el.examNavGrid.appendChild(item);
        }
    }

    function updateExamNavGridActive() {
        const gridItems = el.examNavGrid.querySelectorAll('.exam-grid-item');
        gridItems.forEach((item, idx) => {
            item.classList.toggle('current', idx === state.exam.currentIndex);
        });
    }

    // === PODSUMOWANIE EGZAMINU ===
    function finishExam() {
        abortExam(); // Zatrzymaj timer
        
        // Oblicz punkty
        let score = 0;
        for (let i = 0; i < 40; i++) {
            const q = state.exam.questions[i];
            const ans = state.exam.userAnswers[i];
            if (ans === q.correct_option) {
                score++;
            }
        }
        
        const percentage = Math.round((score / 40) * 100);
        const passed = score >= 20; // Próg 50%
        
        // Przygotuj czas w formacie MM:SS
        const minUsed = Math.floor(state.exam.durationSecondsUsed / 60);
        const secUsed = state.exam.durationSecondsUsed % 60;
        const formattedDuration = `${minUsed}:${secUsed.toString().padStart(2, '0')}`;
        
        // Aktualna data w formacie DD.MM.YYYY
        const now = new Date();
        const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth()+1).toString().padStart(2, '0')}.${now.getFullYear()}`;
        
        // Wynik
        const examResultObj = {
            score: score,
            percentage: percentage,
            passed: passed,
            duration: formattedDuration,
            date: formattedDate
        };
        
        // Zapis do historii
        state.examHistory.push(examResultObj);
        saveExamHistory();
        updateMiniStats();
        
        // Wyświetlanie wyników
        el.examActiveContainer.style.display = 'none';
        el.examResultsContainer.style.display = 'block';
        
        // Wypełnianie danych na karcie wyników
        el.resultEmoji.textContent = passed ? '🎉' : '❌';
        el.resultTitle.textContent = passed ? 'Gratulacje! Zdałeś Egzamin!' : 'Niestety, nie zdałeś egzaminu.';
        el.resultTitle.style.color = passed ? 'var(--success)' : 'var(--danger)';
        el.resultScoreValue.textContent = `${score} / 40`;
        el.resultScorePercent.textContent = `${percentage}%`;
        el.resultSubtext.textContent = passed 
            ? 'Twój wynik kwalifikuje Cię do otrzymania pozytywnej oceny na egzaminie teoretycznym INF.02 (wymagane 50%).'
            : 'Uzyskałeś poniżej wymaganych 50% (20 poprawnych odpowiedzi). Przeanalizuj swoje błędy i spróbuj jeszcze raz.';
        
        // Klasy stylów dla karty podsumowania
        el.resultsSummaryCard.style.borderTop = `6px solid ${passed ? 'var(--success)' : 'var(--danger)'}`;
        
        el.resultTimeValue.textContent = formattedDuration;
        el.resultDateValue.textContent = formattedDate;
        
        // Zresetuj filtry przeglądu i wyrenderuj przegląd błędów
        state.exam.reviewFilter = 'all';
        el.examReviewSection.style.display = 'none'; // Ukryte na start, user klika "Przejrzyj swoje błędy"
        
        renderExamReviewList();
    }

    function renderExamReviewList() {
        el.reviewQuestionsList.innerHTML = '';
        
        // Aktualizacja wyglądu przycisków filtrów
        el.btnFilterReviewAll.classList.toggle('active', state.exam.reviewFilter === 'all');
        el.btnFilterReviewCorrect.classList.toggle('active', state.exam.reviewFilter === 'correct');
        el.btnFilterReviewIncorrect.classList.toggle('active', state.exam.reviewFilter === 'incorrect');
        
        let questionsShown = 0;
        
        for (let i = 0; i < 40; i++) {
            const q = state.exam.questions[i];
            const userAns = state.exam.userAnswers[i];
            const correctAns = q.correct_option;
            const isCorrect = userAns === correctAns;
            
            // Zastosuj filtry
            if (state.exam.reviewFilter === 'correct' && !isCorrect) continue;
            if (state.exam.reviewFilter === 'incorrect' && isCorrect) continue;
            
            questionsShown++;
            
            const card = document.createElement('div');
            card.className = `review-item-card ${isCorrect ? 'correct-card' : 'incorrect-card'}`;
            
            // Header review
            const header = document.createElement('div');
            header.className = 'review-card-header';
            
            const categoryBadge = document.createElement('span');
            categoryBadge.className = `category-badge ${q.category}`;
            categoryBadge.textContent = categoryTranslations[q.category] || q.category;
            
            const statusBadge = document.createElement('span');
            statusBadge.className = 'review-status-badge';
            statusBadge.textContent = isCorrect ? 'Poprawna' : 'Błędna';
            
            header.appendChild(categoryBadge);
            header.appendChild(statusBadge);
            
            // Question text
            const qText = document.createElement('div');
            qText.className = 'question-text';
            qText.textContent = `${i + 1}. ${q.question}`;
            
            // Options list
            const optionsList = document.createElement('div');
            optionsList.className = 'options-container';
            
            q.options.forEach(opt => {
                const optDiv = document.createElement('div');
                optDiv.className = 'option-btn checked'; // Wygląda jak zablokowany przycisk
                
                // Ustal klasy wizualne
                if (opt.letter === correctAns) {
                    optDiv.classList.add('correct');
                } else if (opt.letter === userAns && !isCorrect) {
                    optDiv.classList.add('incorrect');
                }
                
                const letterSpan = document.createElement('span');
                letterSpan.className = 'option-letter';
                letterSpan.textContent = opt.letter;
                
                const textSpan = document.createElement('span');
                textSpan.className = 'option-text';
                textSpan.textContent = opt.text;
                
                optDiv.appendChild(letterSpan);
                optDiv.appendChild(textSpan);
                optionsList.appendChild(optDiv);
            });
            
            // Explanation
            const expBox = document.createElement('div');
            expBox.className = `explanation-box ${isCorrect ? 'correct' : 'incorrect'}`;
            
            const expTitle = document.createElement('div');
            expTitle.className = 'explanation-title';
            expTitle.innerHTML = `<span>ℹ️</span> Wyjaśnienie:`;
            
            const expText = document.createElement('p');
            expText.className = 'explanation-text';
            expText.textContent = q.explanation || "Brak wyjaśnienia.";
            
            expBox.appendChild(expTitle);
            expBox.appendChild(expText);
            
            card.appendChild(header);
            card.appendChild(qText);
            card.appendChild(optionsList);
            card.appendChild(expBox);
            
            el.reviewQuestionsList.appendChild(card);
        }
        
        if (questionsShown === 0) {
            el.reviewQuestionsList.innerHTML = `
                <p style="text-align: center; color: var(--text-secondary); padding: 24px;">Brak pytań pasujących do wybranego filtru.</p>
            `;
        }
    }

    function setReviewFilter(filterValue) {
        state.exam.reviewFilter = filterValue;
        renderExamReviewList();
    }

    // === TRYB PRZEGLĄDANIA BAZY (BROWSE) LOGIKA ===
    function initBrowse() {
        const filtered = getFilteredQuestions();
        el.browseMatchCount.textContent = filtered.length;
        el.browseQuestionsList.innerHTML = '';
        
        if (filtered.length === 0) {
            el.browseQuestionsList.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                    <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                    <h3>Brak wyników w bazie pytań</h3>
                    <p style="margin-top: 8px; font-size: 14px;">Wyczyść filtry, aby wyświetlić pełną bazę 65 pytań.</p>
                </div>
            `;
            return;
        }
        
        // Renderujemy karty jedno-panelowe dla każdego pytania
        filtered.forEach((q, idx) => {
            const card = document.createElement('div');
            card.className = 'browse-item-card';
            
            // Header
            const header = document.createElement('div');
            header.className = 'card-header';
            
            const catBadge = document.createElement('span');
            catBadge.className = `category-badge ${q.category}`;
            catBadge.textContent = categoryTranslations[q.category] || q.category;
            
            const qIdBadge = document.createElement('span');
            qIdBadge.className = 'question-id-badge';
            qIdBadge.textContent = `Baza #${q.id}`;
            
            header.appendChild(catBadge);
            header.appendChild(qIdBadge);
            
            // Question Text
            const qText = document.createElement('div');
            qText.className = 'question-text';
            qText.textContent = `${idx + 1}. ${q.question}`;
            
            // Options List
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'browse-options-list';
            
            q.options.forEach(opt => {
                const optDiv = document.createElement('div');
                optDiv.className = 'browse-option';
                
                if (opt.letter === q.correct_option) {
                    optDiv.classList.add('correct');
                }
                
                const letterSpan = document.createElement('span');
                letterSpan.className = 'option-letter';
                letterSpan.textContent = opt.letter;
                
                const textSpan = document.createElement('span');
                textSpan.className = 'option-text';
                textSpan.textContent = opt.text;
                
                optDiv.appendChild(letterSpan);
                optDiv.appendChild(textSpan);
                optionsGrid.appendChild(optDiv);
            });
            
            // Explanation (widoczne od razu)
            const expBox = document.createElement('div');
            expBox.className = 'explanation-box correct';
            
            const expTitle = document.createElement('div');
            expTitle.className = 'explanation-title';
            expTitle.innerHTML = `<span>💡</span> Wyjaśnienie odpowiedzi ${q.correct_option}:`;
            
            const expText = document.createElement('p');
            expText.className = 'explanation-text';
            expText.textContent = q.explanation || "Brak opisu.";
            
            expBox.appendChild(expTitle);
            expBox.appendChild(expText);
            
            // Złożenie karty
            card.appendChild(header);
            card.appendChild(qText);
            card.appendChild(optionsGrid);
            card.appendChild(expBox);
            
            el.browseQuestionsList.appendChild(card);
        });
    }

    // === ROZPOCZNIJ ===
    init();
});
