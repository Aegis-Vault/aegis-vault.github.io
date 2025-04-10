<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AegisVault - Web3 Security Specialist</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="container">
            <div class="logo">AegisVault</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="burger">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="container">
            <h1>Securing the Future of Web3</h1>
            <h2>Smart Contract Auditing & DeFi Security</h2>
            <p>Identifying vulnerabilities before attackers do.</p>
            <div class="cta-buttons">
                <a href="#services" class="btn primary">View Services</a>
                <a href="#contact" class="btn secondary">Get in Touch</a>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <h2 class="section-title">Security Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon"><i class="fas fa-shield-alt"></i></div>
                    <h3>Pre-Launch Security Review</h3>
                    <p>Comprehensive security analysis before your protocol goes live. Identify critical vulnerabilities and ensure safe deployment.</p>
                    <p class="price">Starting at $499</p>
                </div>
                <div class="service-card">
                    <div class="service-icon"><i class="fas fa-search"></i></div>
                    <h3>Smart Contract Audit</h3>
                    <p>In-depth analysis of contract code, logic flows, and potential attack vectors with detailed remediation guidance.</p>
                    <p class="price">Starting at $799</p>
                </div>
                <div class="service-card">
                    <div class="service-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <h3>Vulnerability Assessment</h3>
                    <p>Targeted review focusing on high-risk areas like reentrancy, oracle manipulation, and access control issues.</p>
                    <p class="price">Starting at $299</p>
                </div>
                <div class="service-card">
                    <div class="service-icon"><i class="fas fa-sync-alt"></i></div>
                    <h3>Ongoing Security Monitoring</h3>
                    <p>Continuous protection with regular security checks and update reviews for evolving protocols.</p>
                    <p class="price">Custom Pricing</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="portfolio">
        <div class="container">
            <h2 class="section-title">Security Portfolio</h2>
            <div class="case-study">
                <h3>Squeeth Protocol Security Analysis</h3>
                <div class="tags">
                    <span class="tag">DeFi</span>
                    <span class="tag">ETH²</span>
                    <span class="tag">Uniswap</span>
                </div>
                <p class="case-description">
                    Conducted comprehensive security review of Squeeth, a complex power perpetual protocol offering ETH² exposure.
                </p>
                <div class="findings">
                    <h4>Key Findings:</h4>
                    <ul>
                        <li><strong>Reentrancy Risks</strong>: Identified 17 potential reentrancy vectors in ETH-handling functions</li>
                        <li><strong>Oracle Manipulation</strong>: Discovered potential TWAP manipulation vulnerability with 420-second window</li>
                        <li><strong>Mathematical Precision</strong>: Highlighted precision loss risks in ETH² calculations</li>
                        <li><strong>Access Control</strong>: Flagged centralization concerns in privileged system functions</li>
                    </ul>
                </div>
                <div class="methodology">
                    <h4>Methodology:</h4>
                    <p>Combined automated analysis with manual code review, focusing on:</p>
                    <ul>
                        <li>Static pattern analysis for common vulnerabilities</li>
                        <li>Function-level security assessment</li>
                        <li>Cross-contract interaction verification</li>
                        <li>Economic security considerations</li>
                    </ul>
                </div>
            </div>
            <!-- Additional case studies would go here -->
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title">About AegisVault</h2>
            <div class="about-content">
                <div class="about-image">
                    <img src="https://via.placeholder.com/400x400" alt="AegisVault Security">
                </div>
                <div class="about-text">
                    <p>
                        With over 10 years in tech and system engineering, AegisVault was founded out of a passion for blockchain security and decentralized systems.
                    </p>
                    <p>
                        What started as a fascination with cryptography evolved into a dedicated security practice focused on protecting Web3 protocols from exploitation.
                    </p>
                    <h3>Technical Expertise:</h3>
                    <ul class="skills-list">
                        <li><span>Smart Contract Languages:</span> Solidity, Vyper</li>
                        <li><span>Analysis Tools:</span> Slither, MythX, Foundry, Echidna</li>
                        <li><span>Frameworks:</span> OpenZeppelin, Hardhat, Truffle</li>
                        <li><span>DeFi Knowledge:</span> AMMs, Lending Protocols, Derivatives</li>
                    </ul>
                    <p>
                        I believe security is not just about finding bugs—it's about understanding the entire protocol ecosystem and identifying real-world attack vectors.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Get in Touch</h2>
            <p class="contact-intro">Ready to secure your Web3 project? Let's discuss how I can help protect your protocol.</p>
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <p>aegisvault1@gmail.com</p>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-telegram"></i>
                        <p>@AEGISVault</p>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-twitter"></i>
                        <p>@AegisVault</p>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-github"></i>
                        <p>github.com/Aegis-Vault</p>
                    </div>
                </div>
                <div class="contact-form">
                    <form id="contactForm">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" name="subject" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">AegisVault</div>
                <p class="tagline">Securing Web3, One Smart Contract at a Time</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-github"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-telegram"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
            <div class="copyright">
                &copy; 2025 AegisVault. All Rights Reserved.
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
