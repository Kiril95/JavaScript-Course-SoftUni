import { html } from '../node_modules/lit-html/lit-html.js';
import { loginUser } from '../src/auth/login.js';

export const logTemplate = () => {
    return html`
    <section id="loginPage">
        <form class="loginForm" @submit=${loginUser}>
            <img src="./images/logo.png" alt="logo" />
            <h2>Login</h2>
    
            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Login</button>
    
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </form>
    </section>
`;}