import { html } from '../node_modules/lit-html/lit-html.js';
import { loginUser } from '../src/auth/login.js';

export const logTemplate = () => {
    return html`
    <section id="login">
        <form id="login-form" @submit=${loginUser}>
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;}