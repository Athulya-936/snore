
        // Backend Simulation - Database and API Layer
        class SnoringSymphonyBackend {
            constructor() {
                this.data = {
                    gallery: [],
                    leaderboard: [],
                    stats: {
                        totalSnores: 247,
                        totalShares: 1423,
                        totalLaughs: 8956
                    },
                    users: new Map()
                };
                this.initializeDefaultData();
            }

            initializeDefaultData() {
                // Initialize with some sample data
                this.data.gallery = [
                    {
                        id: '1',
                        name: 'Midnight Jazz Snore',
                        genre: 'jazz',
                        creator: 'SleepyJazzLover',
                        plays: 542,
                        likes: 89,
                        shares: 34,
                        audioUrl: null,
                        timestamp: new Date('2024-12-01')
                    },
                    {
                        id: '2',
                        name: 'Horror Snore Attack',
                        genre: 'horror',
                        creator: 'NightmareKing',
                        plays: 721,
                        likes: 156,
                        shares: 67,
                        audioUrl: null,
                        timestamp: new Date('2024-12-02')
                    },
                    {
                        id: '3',
                        name: 'Rap Battle Snore',
                        genre: 'rap',
                        creator: 'SnoreFlow',
                        plays: 389,
                        likes: 92,
                        shares: 28,
                        audioUrl: null,
                        timestamp: new Date('2024-12-03')
                    }
                ];

                this.data.leaderboard = [
                    { position: 1, name: 'SnoreKing2025', track: 'The Thunderous Classical', genre: 'classical', score: 2847, meme: '👑' },
                    { position: 2, name: 'SleepyMcSnoreface', track: 'Jazz Fusion Madness', genre: 'jazz', score: 2134, meme: '🥈' },
                    { position: 3, name: 'NightNoiseNinja', track: 'Western Showdown', genre: 'western', score: 1823, meme: '🥉' }
                ];
            }

            // API Methods
            async uploadSnore(audioBlob, metadata) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const id = Date.now().toString();
                        const audioUrl = URL.createObjectURL(audioBlob);
                        resolve({ success: true, audioUrl, id });
                    }, 1000);
                });
            }

            async transformAudio(audioUrl, genre, remixGenres = []) {
                return new Promise((resolve) => {
                    const processingTime = remixGenres.length > 0 ? 4000 : 3000;
                    
                    setTimeout(() => {
                        const trackName = this.generateTrackName(genre, remixGenres);
                        const transformedUrl = audioUrl; // In real app, this would be processed audio
                        
                        const newTrack = {
                            id: Date.now().toString(),
                            name: trackName,
                            genre: remixGenres.length > 0 ? 'remix' : genre,
                            genres: remixGenres.length > 0 ? remixGenres : [genre],
                            creator: 'You',
                            plays: 0,
                            likes: 0,
                            shares: 0,
                            audioUrl: transformedUrl,
                            timestamp: new Date()
                        };

                        this.data.gallery.unshift(newTrack);
                        this.updateStats();
                        
                        resolve({ 
                            success: true, 
                            track: newTrack,
                            message: `🎉 SUCCESS! Created: "${trackName}" - Ready to share! 🚀`
                        });
                    }, processingTime);
                });
            }

            generateTrackName(genre, remixGenres = []) {
                if (remixGenres.length > 0) {
                    return `Ultimate ${remixGenres.join('-').toUpperCase()} Chaos Symphony`;
                }

                const names = {
                    jazz: ["Smooth Snore Serenade", "Midnight Snore Blues", "Bebop Bedroom Beat", "Cool Cat Snore", "Jazzy Sleepy Time"],
                    rap: ["Snore Flow Supreme", "Sleep Rap Battle", "Bedtime Bars & Beats", "MC Sleepy's Drop", "Snore Cypher"],
                    horror: ["Nightmare Snore Symphony", "Terror in the Bedroom", "Haunted Sleep Sounds", "Demon Snore", "Scary Sleep"],
                    classical: ["Snore Symphony No. 9", "The Sleeping Beauty Overture", "Nocturne for Nostrils", "Beethoven's Dream", "Mozart's Sleep"],
                    western: ["Cowboy's Lullaby", "Wild West Sleep Sounds", "Snore on the Range", "Sheriff's Slumber", "Desert Dream"]
                };
                return names[genre][Math.floor(Math.random() * names[genre].length)];
            }

            async shareToSocial(trackId, platform) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const track = this.data.gallery.find(t => t.id === trackId);
                        if (track) {
                            track.shares++;
                            this.updateStats();
                        }

                        const messages = {
                            whatsapp: `🎵 Check out my epic snore symphony "${track?.name}"! Made with Snoring Symphony! 😴🎭 #SnoreArt`,
                            instagram: `Just turned my snore into a ${track?.genre?.toUpperCase()} masterpiece! 🎵😂 #SnoringSymphony #EpicSnores #SleepMusic`,
                            youtube: `My LEGENDARY ${track?.genre?.toUpperCase()} snore transformation: "${track?.name}"! 🎵👑 Created with Snoring Symphony!`
                        };

                        resolve({
                            success: true,
                            platform,
                            message: messages[platform],
                            shareUrl: `https://snoringsymphony.com/track/${trackId}`
                        });
                    }, 500);
                });
            }

            async updateLeaderboard(trackName, genre, score = null) {
                const newScore = score || Math.floor(Math.random() * 1000) + 500;
                const newEntry = {
                    position: this.data.leaderboard.length + 1,
                    name: 'You',
                    track: trackName,
                    genre: genre,
                    score: newScore,
                    meme: this.getRandomMemeEmoji()
                };

                this.data.leaderboard.push(newEntry);
                this.data.leaderboard.sort((a, b) => b.score - a.score);
                
                // Update positions
                this.data.leaderboard.forEach((entry, index) => {
                    entry.position = index + 1;
                });

                return newEntry;
            }

            getRandomMemeEmoji() {
                const memes = ['🤪', '😂', '🎭', '🎪', '🦄', '🚀', '⭐', '💫', '🎯', '🔥'];
                return memes[Math.floor(Math.random() * memes.length)];
            }

            updateStats() {
                this.data.stats.totalSnores++;
                this.data.stats.totalLaughs += Math.floor(Math.random() * 50) + 10;
            }

            getGallery() {
                return this.data.gallery.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            }

            getLeaderboard() {
                return this.data.leaderboard;
            }

            getStats() {
                return this.data.stats;
            }

            async deleteTrack(trackId) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.data.gallery = this.data.gallery.filter(track => track.id !== trackId);
                        resolve({ success: true });
                    }, 500);
                });
            }

            async likeTrack(trackId) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const track = this.data.gallery.find(t => t.id === trackId);
                        if (track) {
                            track.likes++;
                            this.updateStats();
                        }
                        resolve({ success: true, likes: track?.likes || 0 });
                    }, 300);
                });
            }
        }

        // Frontend Application
        class SnoringSymphonyApp {
            constructor() {
                this.backend = new SnoringSymphonyBackend();
                this.isRecording = false;
                this.mediaRecorder = null;
                this.audioChunks = [];
                this.selectedGenre = null;
                this.remixGenres = [];
                this.recordedAudio = null;
                this.uploadedAudio = null;
                
                this.memes = [
                    "...NASA thought it was a rocket launch! 🚀",
                    "...the earthquake department called to check! 🌍",
                    "...your neighbors moved to another country! 🏃‍♂️",
                    "...even hibernating bears woke up! 🐻",
                    "...it registered on the Richter scale! 📊",
                    "...aliens thought it was a communication signal! 👽",
                    "...thunder got jealous! ⚡",
                    "...the ocean waves got scared! 🌊",
                    "...even zombies couldn't sleep! 🧟‍♂️",
                    "...it became a new alarm clock standard! ⏰",
                    "...seismologists reported a new kind of tremor! 🌋",
                    "...your pet started wearing earplugs! 🐕",
                    "...the Wi-Fi signal got disrupted! 📶",
                    "...even construction workers took a break! 👷‍♂️",
                    "...birds started migrating in December! 🦅"
                ];

                this.init();
            }

            init() {
                this.setupEventListeners();
                this.loadInitialData();
                this.updateStatsDisplay();
                this.startRandomMemeGeneration();
            }

            setupEventListeners() {
                // Record button
                document.getElementById('recordBtn').addEventListener('click', () => this.toggleRecording());

                // Upload area
                const uploadArea = document.getElementById('uploadArea');
                const fileInput = document.getElementById('fileInput');
                
                uploadArea.addEventListener('click', () => fileInput.click());
                uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
                uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
                uploadArea.addEventListener('drop', this.handleFileDrop.bind(this));
                fileInput.addEventListener('change', this.handleFileSelect.bind(this));
            }

            async loadInitialData() {
                this.renderGallery();
                this.renderLeaderboard();
            }

            updateStatsDisplay() {
                const stats = this.backend.getStats();
                document.getElementById('totalSnores').textContent = stats.totalSnores.toLocaleString();
                document.getElementById('totalShares').textContent = stats.totalShares.toLocaleString();
                document.getElementById('totalLaughs').textContent = stats.totalLaughs.toLocaleString();
            }

            startRandomMemeGeneration() {
                setInterval(() => {
                    if (Math.random() < 0.3) { // 30% chance every interval
                        this.generateMeme();
                    }
                }, 15000); // Every 15 seconds
            }

            async toggleRecording() {
                const btn = document.getElementById('recordBtn');
                const status = document.getElementById('status');
                const visualizer = document.getElementById('visualizer');
                const audioControls = document.getElementById('recordedAudioControls');

                if (!this.isRecording) {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        this.mediaRecorder = new MediaRecorder(stream);
                        this.audioChunks = [];

                        this.mediaRecorder.ondataavailable = event => {
                            this.audioChunks.push(event.data);
                        };

                        this.mediaRecorder.onstop = async () => {
                            const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                            const result = await this.backend.uploadSnore(audioBlob, { source: 'recording' });
                            
                            if (result.success) {
                                this.recordedAudio = result.audioUrl;
                                const audioElement = document.getElementById('recordedAudio');
                                audioElement.src = this.recordedAudio;
                                audioControls.style.display = 'block';
                                status.textContent = "Epic snore recorded! Choose a genre to transform it! 🎵";
                            }
                            visualizer.style.display = 'none';
                        };

                        this.mediaRecorder.start();
                        this.isRecording = true;
                        btn.classList.add('recording');
                        btn.innerHTML = '<div>⏹️<br>STOP</div>';
                        status.textContent = "Recording your legendary snore... 🎙️";
                        visualizer.style.display = 'flex';
                    } catch (err) {
                        console.error('Error accessing microphone:', err);
                        status.textContent = "Oops! Couldn't access microphone 🎤❌";
                    }
                } else {
                    this.mediaRecorder.stop();
                    this.isRecording = false;
                    btn.classList.remove('recording');
                    btn.innerHTML = '<div>🎙️<br>START</div>';
                    this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
                }
            }

            handleDragOver(e) {
                e.preventDefault();
                document.getElementById('uploadArea').style.background = 'rgba(255,255,255,0.2)';
            }

            handleDragLeave(e) {
                e.preventDefault();
                document.getElementById('uploadArea').style.background = 'transparent';
            }

            handleFileDrop(e) {
                e.preventDefault();
                document.getElementById('uploadArea').style.background = 'transparent';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.processFile(files[0]);
                }
            }

            handleFileSelect(e) {
                if (e.target.files.length > 0) {
                    this.processFile(e.target.files[0]);
                }
            }

            async processFile(file) {
                const uploadStatus = document.getElementById('uploadStatus');
                const audioControls = document.getElementById('uploadedAudioControls');

                if (file.type.startsWith('audio/')) {
                    const result = await this.backend.uploadSnore(file, { source: 'upload', filename: file.name });
                    
                    if (result.success) {
                        this.uploadedAudio = result.audioUrl;
                        const audioElement = document.getElementById('uploadedAudio');
                        audioElement.src = this.uploadedAudio;
                        audioControls.style.display = 'block';
                        uploadStatus.textContent = `✅ ${file.name} loaded! Ready to transform! 🎵`;
                    }
                } else {
                    uploadStatus.textContent = "❌ Please upload an audio file!";
                }
            }

            selectGenre(genre) {
                // Remove previous selection
                document.querySelectorAll('.genre-btn').forEach(btn => btn.classList.remove('selected'));
                
                // Add selection to current genre
                document.querySelector(`.genre-btn.${genre}`).classList.add('selected');
                
                this.selectedGenre = genre;
                const status = document.getElementById('genreStatus');
                
                const currentAudio = this.recordedAudio || this.uploadedAudio;
                if (currentAudio) {
                    this.transformAudio(genre);
                } else {
                    status.textContent = `${genre.toUpperCase()} selected! Record or upload a snore first! 🎵`;
                }
            }

            async transformAudio(genre) {
                const status = document.getElementById('genreStatus');
                const overlay = document.getElementById('processingOverlay');
                const processingText = document.getElementById('processingText');
                
                const currentAudio = this.recordedAudio || this.uploadedAudio;
                if (!currentAudio) {
                    status.textContent = "Please record or upload a snore first! 🎙️";
                    return;
                }

                // Show processing overlay
                overlay.style.display = 'flex';
                processingText.textContent = `🎵 Transforming your snore into ${genre.toUpperCase()} magic... ✨`;

                try {
                    const result = await this.backend.transformAudio(currentAudio, genre);
                    
                    if (result.success) {
                        status.textContent = result.message;
                        await this.backend.updateLeaderboard(result.track.name, genre);
                        this.renderGallery();
                        this.renderLeaderboard();
                        this.updateStatsDisplay();
                        
                        // Show success animation
                        this.showSuccessAnimation(result.track.name);
                    }
                } catch (error) {
                    status.textContent = "❌ Something went wrong during transformation!";
                } finally {
                    overlay.style.display = 'none';
                }
            }

            addToRemix(genre) {
                if (!this.remixGenres.includes(genre)) {
                    this.remixGenres.push(genre);
                    document.getElementById('remixStatus').textContent = 
                        `Remix ingredients: ${this.remixGenres.map(g => g.toUpperCase()).join(', ')} 🎭`;
                }
            }

            async createRemix() {
                const remixStatus = document.getElementById('remixStatus');
                
                if (this.remixGenres.length < 2) {
                    remixStatus.textContent = "Add at least 2 genres for ultimate chaos! 🎪";
                    return;
                }
                
                const currentAudio = this.recordedAudio || this.uploadedAudio;
                if (!currentAudio) {
                    remixStatus.textContent = "Record or upload a snore first! 🎙️";
                    return;
                }

                const overlay = document.getElementById('processingOverlay');
                const processingText = document.getElementById('processingText');
                
                overlay.style.display = 'flex';
                processingText.textContent = "🎭 Creating the most chaotic snore remix ever... Hold on! 🌪️";

                try {
                    const result = await this.backend.transformAudio(currentAudio, 'remix', this.remixGenres);
                    
                    if (result.success) {
                        remixStatus.textContent = `🎉 REMIX COMPLETE: "${result.track.name}" - This is LEGENDARY! 👑`;
                        await this.backend.updateLeaderboard(result.track.name, 'remix');
                        this.renderGallery();
                        this.renderLeaderboard();
                        this.updateStatsDisplay();
                        this.remixGenres = [];
                        
                        this.showSuccessAnimation(result.track.name);
                    }
                } catch (error) {
                    remixStatus.textContent = "❌ Remix failed! Try again!";
                } finally {
                    overlay.style.display = 'none';
                }
            }

            showSuccessAnimation(trackName) {
                // Create floating success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(45deg, #00d4aa, #00b894);
                    color: white;
                    padding: 20px;
                    border-radius: 15px;
                    font-size: 1.2rem;
                    font-weight: bold;
                    z-index: 1001;
                    animation: successPop 3s ease-in-out forwards;
                    box-shadow: 0 10px 30px rgba(0,212,170,0.5);
                `;
                successMsg.textContent = `🎉 "${trackName}" created successfully! 🚀`;
                
                // Add animation keyframes
                if (!document.getElementById('successAnimation')) {
                    const style = document.createElement('style');
                    style.id = 'successAnimation';
                    style.textContent = `
                        @keyframes successPop {
                            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                            20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                            80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    document.body.removeChild(successMsg);
                }, 3000);
            }

            renderGallery() {
                const gallery = this.backend.getGallery();
                const galleryGrid = document.getElementById('galleryGrid');
                
                galleryGrid.innerHTML = gallery.map(track => {
                    const genreEmojis = {
                        jazz: "🎷", rap: "🎤", horror: "👻", 
                        classical: "🎻", western: "🤠", remix: "🎭"
                    };
                    
                    return `
                        <div class="gallery-item" data-track-id="${track.id}">
                            <h3>${genreEmojis[track.genre] || '🎵'} ${track.name}</h3>
                            <p>By: ${track.creator}</p>
                            <p>🎧 ${track.plays} plays • ❤️ ${track.likes} likes • 📤 ${track.shares} shares</p>
                            ${track.audioUrl ? `
                                <audio class="audio-player" controls>
                                    <source src="${track.audioUrl}" type="audio/wav">
                                </audio>
                            ` : ''}
                            <div class="audio-controls">
                                <button class="play-btn" onclick="app.likeTrack('${track.id}')">❤️ Like</button>
                                ${track.creator === 'You' ? `<button class="delete-btn" onclick="app.deleteTrack('${track.id}')">🗑️ Delete</button>` : ''}
                            </div>
                            <div class="social-share">
                                <button class="social-btn whatsapp" onclick="app.shareToSocial('${track.id}', 'whatsapp')">WhatsApp</button>
                                <button class="social-btn instagram" onclick="app.shareToSocial('${track.id}', 'instagram')">Instagram</button>
                                <button class="social-btn youtube" onclick="app.shareToSocial('${track.id}', 'youtube')">YouTube</button>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            renderLeaderboard() {
                const leaderboard = this.backend.getLeaderboard();
                const leaderboardList = document.getElementById('leaderboardList');
                
                leaderboardList.innerHTML = leaderboard.map((entry, index) => {
                    const backgrounds = [
                        'linear-gradient(45deg, #ffd700, #ffed4e)',
                        'linear-gradient(45deg, #c0c0c0, #e5e5e5)',
                        'linear-gradient(45deg, #cd7f32, #daa520)',
                        'rgba(255,255,255,0.1)'
                    ];
                    const textColors = ['color: #333;', 'color: #333;', 'color: white;', 'color: white;'];
                    
                    return `
                        <div class="leaderboard-item" style="background: ${backgrounds[index] || backgrounds[3]}; ${textColors[index] || textColors[3]}">
                            <div class="winner-meme">${entry.meme}</div>
                            <div>
                                <h3>${entry.position === 1 ? '🥇' : entry.position === 2 ? '🥈' : entry.position === 3 ? '🥉' : '🏅'} ${entry.name} - "${entry.track}"</h3>
                                <p>${entry.genre.toUpperCase()} • Score: ${entry.score.toLocaleString()} points</p>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            async shareToSocial(trackId, platform) {
                try {
                    const result = await this.backend.shareToSocial(trackId, platform);
                    
                    if (result.success) {
                        // Show share dialog
                        const shareText = `Sharing to ${platform.toUpperCase()}!\n\n"${result.message}"\n\n🚀 Link: ${result.shareUrl}`;
                        alert(shareText);
                        
                        // Update gallery display
                        this.renderGallery();
                        this.updateStatsDisplay();
                        
                        // Increment global shares
                        this.backend.data.stats.totalShares++;
                    }
                } catch (error) {
                    alert(`Failed to share to ${platform}. Please try again!`);
                }
            }

            async deleteTrack(trackId) {
                if (confirm('Are you sure you want to delete this masterpiece?')) {
                    try {
                        const result = await this.backend.deleteTrack(trackId);
                        if (result.success) {
                            this.renderGallery();
                            alert('Track deleted successfully! 🗑️');
                        }
                    } catch (error) {
                        alert('Failed to delete track. Please try again!');
                    }
                }
            }

            async likeTrack(trackId) {
                try {
                    const result = await this.backend.likeTrack(trackId);
                    if (result.success) {
                        this.renderGallery();
                        this.updateStatsDisplay();
                    }
                } catch (error) {
                    console.error('Failed to like track:', error);
                }
            }

            generateMeme() {
                const memeText = document.getElementById('memeText');
                const randomMeme = this.memes[Math.floor(Math.random() * this.memes.length)];
                memeText.textContent = randomMeme;
                
                // Add a little animation
                memeText.style.transform = 'scale(1.1)';
                memeText.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    memeText.style.transform = 'scale(1)';
                }, 300);
            }
        }

        // Initialize the application
        let app;
        document.addEventListener('DOMContentLoaded', () => {
            app = new SnoringSymphonyApp();
        });

        // Global functions for onclick handlers
        function selectGenre(genre) {
            app.selectGenre(genre);
        }

        function addToRemix(genre) {
            app.addToRemix(genre);
        }

        function createRemix() {
            app.createRemix();
        }

        function generateMeme() {
            app.generateMeme();
        }

        // Auto-update stats periodically
        setInterval(() => {
            if (app) {
                app.updateStatsDisplay();
            }
        }, 30000); // Every 30 seconds
    
