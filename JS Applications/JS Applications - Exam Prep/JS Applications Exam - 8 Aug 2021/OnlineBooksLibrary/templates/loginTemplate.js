import { html } from '../node_modules/lit-html/lit-html.js';
import { loginUser } from '../src/auth/login.js';

export const logTemplate = () => {
    return html`
    <section id="login-page" class="login">
        <form id="login-form" @submit=${loginUser}>
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>
`;}
