---
title: Developer Sandbox
hide_title: true
sidebar_position: 2
---


# Getting Started with App Development

Your safe space to experiment, build, and perfect your epilot App

<div className="container">
  <div className="row">
    <div className="col col--6">
      <div className="card margin-bottom--lg" style={{height: '100%'}}>
        <div className="card__body">
          <h3>Safe Experimentation</h3>
          <p>Explore the full capabilities of the epilot platform without risking production environments. Your sandbox is your personal laboratory for innovation.</p>
        </div>
      </div>
    </div>
    <div className="col col--6">
      <div className="card margin-bottom--lg" style={{height: '100%'}}>
        <div className="card__body">
          <h3>Rapid Development</h3>
          <p>Build, test, and refine your apps in an environment that mimics production but forgives mistakes. Iterate quickly without fear of breaking changes.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## Why You Need a Sandbox

The standard epilot portal is designed for production environments where precision is paramount. Even minor configuration errors could potentially:

- Disrupt running systems
- Cause data inconsistencies
- Affect end-customer experiences
- Undermine trust in your solutions

This is precisely why epilot provides dedicated sandbox accounts—isolated environments specifically designed for developers to experiment, learn, and innovate without these risks.

## Your App Development Journey

<div className="steps-container">
  <div className="step">
    <div className="step-number">1</div>
    <div className="step-content">
      <h3>Request a Sandbox</h3>
      <p>Submit your request through our <a href="https://portal.dev.epilot.cloud/request-sandbox" className="button button--primary">Developer Portal</a></p>
    </div>
  </div>
  <div className="step">
    <div className="step-number">2</div>
    <div className="step-content">
      <h3>Access Your Environment</h3>
      <p>After approval, sign in with your provided credentials and explore your new development space</p>
    </div>
  </div>
  <div className="step">
    <div className="step-number">3</div>
    <div className="step-content">
      <h3>Create Your First App</h3>
      <p>Navigate to the <a href="https://portal.epilot.cloud/app/apps/configuration/new">app creation page</a> and start building</p>
    </div>
  </div>
  <div className="step">
    <div className="step-number">4</div>
    <div className="step-content">
      <h3>Test & Refine</h3>
      <p>Thoroughly test your app in various scenarios and refine until perfect</p>
    </div>
  </div>
  <div className="step">
    <div className="step-number">5</div>
    <div className="step-content">
      <h3>Submit for Review</h3>
      <p>When you're confident in your app, submit it for review to make it publicly available</p>
    </div>
  </div>
</div>

## Benefits of Sandbox Development

<div className="benefits-container">
  <div className="benefit">
    <h3>Complete Isolation</h3>
    <p>Experiment freely without affecting other systems or users in the epilot ecosystem</p>
  </div>
  <div className="benefit">
    <h3>Comprehensive Testing</h3>
    <p>Test your app thoroughly in a realistic environment that matches production</p>
  </div>
  <div className="benefit">
    <h3>Full Configuration</h3>
    <p>Access all the necessary tools and features to build sophisticated apps</p>
  </div>
  <div className="benefit">
    <h3>Risk-Free Debugging</h3>
    <p>Find and fix issues without concern for production impacts</p>
  </div>
</div>

## From Private to Public

Your initial app development takes place in a protected environment:

1. **Private Stage**: Your app is only available for installation within your sandbox account
2. **Review Process**: When ready, submit your app for a formal review
3. **Public Launch**: After approval, your app becomes available to the entire epilot community

To learn more about transitioning from development to publication, visit our detailed guide in the [Publishing](/apps/publishing/verification-process) section.

<div className="cta-container">
  <h3>Ready to start building?</h3>
  <a href="https://portal.dev.epilot.cloud/request-sandbox" className="button button--primary">Request Your Sandbox Today</a>
</div>

<style dangerouslySetInnerHTML={{__html: `
  .steps-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .step {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    background: var(--ifm-card-background-color);
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .step:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border-color: var(--ifm-color-primary-lightest);
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--ifm-color-primary);
    color: var(--ifm-color-white);
    font-weight: bold;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--ifm-heading-color);
  }
  
  .benefits-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .benefit {
    padding: 1.5rem;
    background: var(--ifm-card-background-color);
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .benefit:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    border-color: var(--ifm-color-primary-lightest);
  }
  
  .benefit h3 {
    margin-top: 0;
    color: var(--ifm-heading-color);
  }
  
  .cta-container {
    margin: 3rem 0;
    padding: 2rem;
    text-align: center;
    background: var(--ifm-card-background-color);
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }

  .cta-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--ifm-color-primary);
    background: linear-gradient(90deg, 
      var(--ifm-color-primary-dark), 
      var(--ifm-color-primary), 
      var(--ifm-color-primary-light));
  }

  html[data-theme='dark'] .card,
  html[data-theme='dark'] .step,
  html[data-theme='dark'] .benefit,
  html[data-theme='dark'] .cta-container {
    border-color: var(--ifm-color-emphasis-300);
  }

  html[data-theme='dark'] .step:hover,
  html[data-theme='dark'] .benefit:hover {
    border-color: var(--ifm-color-primary);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`}} />