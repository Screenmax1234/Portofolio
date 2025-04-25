document.addEventListener('DOMContentLoaded', () => {
  // Initialize particles.js with more vibrant colors
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#ff00ff', '#00ffff', '#ffcc00', '#ff3377']
      },
      shape: {
        type: ['circle', 'triangle', 'star'],
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.6,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#00ffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'bubble'
        },
        onclick: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 200,
          size: 6,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  const links = document.querySelectorAll('a, .btn, .menu-btn');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 50);
  });

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.opacity = '0';
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.opacity = '1';
    });
  });

  // Discord username functionality
  const discordBtn = document.getElementById('discord-btn');
  const discordLink = document.getElementById('discord-link');
  const discordUsername = 'chris_official';
  
  function showDiscordUsername() {
    // Create tooltip element if it doesn't exist
    let tooltip = document.querySelector('.discord-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'discord-tooltip';
      document.body.appendChild(tooltip);
      
      // Style the tooltip
      tooltip.style.position = 'fixed';
      tooltip.style.padding = '10px 15px';
      tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
      tooltip.style.color = '#fff';
      tooltip.style.borderRadius = '5px';
      tooltip.style.zIndex = '9999';
      tooltip.style.boxShadow = '0 0 10px rgba(255, 0, 255, 0.5)';
      tooltip.style.backdropFilter = 'blur(5px)';
      tooltip.style.border = '1px solid rgba(255, 0, 255, 0.3)';
      tooltip.style.fontSize = '14px';
      tooltip.style.fontFamily = "'Rajdhani', sans-serif";
      tooltip.style.transition = 'opacity 0.3s ease';
    }
    
    // Update tooltip content and position
    tooltip.innerHTML = `<i class="fab fa-discord" style="color:#5865F2;margin-right:5px;"></i> ${discordUsername} <span style="opacity:0.7;font-size:12px;">(copied!)</span>`;
    
    // Position near the button that was clicked
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.style.opacity = '1';
    
    // Copy to clipboard
    navigator.clipboard.writeText(discordUsername).catch(err => {
      console.error('Could not copy text: ', err);
    });
    
    // Hide after 3 seconds
    setTimeout(() => {
      tooltip.style.opacity = '0';
    }, 3000);
  }
  
  discordBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showDiscordUsername();
  });
  
  discordLink.addEventListener('click', (event) => {
    event.preventDefault();
    showDiscordUsername();
  });

  // Menu toggle
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    menuBtn.classList.toggle('active');
    
    if (menuBtn.classList.contains('active')) {
      menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });

  // Typing animation
  const typingElement = document.querySelector('.typing-text');
  const messages = [
    'creating digital experiences',
    'exploring new technologies',
    'turning ideas into reality',
    'building the future with code',
    'passionate about AI and web development'
  ];
  
  let messageIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetween = 2000;

  function typeEffect() {
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
      // Deleting text
      typingElement.textContent = currentMessage.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, deletingSpeed);
      }
    } else {
      // Typing text
      typingElement.textContent = currentMessage.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentMessage.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetween);
      } else {
        setTimeout(typeEffect, typingSpeed);
      }
    }
  }

  // Start typing animation
  setTimeout(typeEffect, 1000);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      
      // Close menu if open
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      menuBtn.classList.remove('active');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to nav items on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('nav ul li a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Add active class to Home when at the top
    if (scrollPosition < 100) {
      document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#') {
          link.classList.add('active');
        }
      });
    }
  });

  // Add parallax effect to hero section
  window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.hero-content').style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
