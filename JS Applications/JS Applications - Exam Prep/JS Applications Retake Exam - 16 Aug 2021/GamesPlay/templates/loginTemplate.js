import { html } from '../node_modules/lit-html/lit-html.js';
import { loginUser } from '../src/auth/login.js';

export const logTemplate = () => {
    return html`
    <section id="login-page" class="auth">
        <form id="login" @submit=${loginUser}>
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email">
    
                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>
`;}