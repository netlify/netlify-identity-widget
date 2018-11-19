// Type definitions for netlify-identity-widget v1.4.14
// Project: https://github.com/netlify/netlify-identity-widget
// Definitions by: Naveen Kumar Sangi <https://github.com/nkprince007>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

export = NetlifyIdentityWidget;

declare namespace NetlifyIdentityWidget {
    interface Headers {
        [header: string]: string | string[] | undefined;
    }

    interface Api {
        _sameOrigin?: boolean;
        apiURL: string;
        defaultHeaders: Headers;
    }

    interface Token {
        access_token: string;
        expires_at: string | number;
        expires_in: string | number;
        refresh_token: string;
        token_type: string;
    }

    interface User {
        api: Api;
        app_metadata: {
            provider: string;
        };
        aud: string;
        audience?: any;
        confirmed_at: string;
        created_at: string;
        updated_at: string;
        email: string;
        id: string;
        role: string;
        token?: Token;
        url: string;
        user_metadata: {
            avatar_url: string;
            full_name: string;
        };
    };

    interface InitOptions {
        // The container to attach to. e.g.: '#some-query-selector'
        container?: string;

        // Absolute url to endpoint. ONLY USE IN SPECIAL CASES!
        // e.g. https://www.example.com/.netlify/functions/identity
        // Generally avoid setting the APIUrl. You should only set this when
        // your app is served from a domain that differs from where the
        // identity endpoint is served.This is common for Cordova or Electron
        // apps where you host from localhost or a file.
        APIUrl?: string;
    }

    /**
     * Initialises the netlify identity widget.
     */
    function init(opts?: InitOptions): void;

    /**
     * Opens the netlify login modal to the corresponding tab where tabName
     * can be one of 'login' and 'signup'. The default value is 'login'.
     */
    function open(tabName?: string): void;

    /**
     * Closes the netlify login modal.
     */
    function close(): void;

    /**
     * Retrieves the current logged in user information.
     */
    function currentUser(): User | null;

    /**
     * Registers callbacks to corresponding events where event is one of the
     * following strings.
     * - 'init'
     * - 'login'
     * - 'logout'
     * - 'error'
     * - 'open'
     * - 'close'
     */
    function on(event: string, cb: Function);

    /**
     * Logs out the current user. Returns a Promise<void> when a user is
     * logged in, else returns undefined.
     */
    function logout(): Promise<void> | undefined;
}
