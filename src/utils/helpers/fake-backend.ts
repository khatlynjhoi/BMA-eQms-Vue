export { fakeBackend };

interface FakeUser {
  id: number;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
}

interface FakeResponseBody {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
}

function fakeBackend(): void {
  const users: FakeUser[] = [
    {
      id: 1,
      username: 'info@phoenixcoded.co',
      password: 'admin123',
      firstName: 'Quality Management',
      lastName: 'Representative',
      role: 'Quality Management Representative',
      department: 'Executive Division'
    }
  ];

  const realFetch = window.fetch;

  window.fetch = function (
    url: string | URL | Request,
    opts?: RequestInit
  ): Promise<Response> {
    const urlString = typeof url === 'string' ? url : url.toString();
    const requestOpts = opts || {};

    return new Promise<Response>((resolve, reject) => {
      setTimeout(handleRoute, 300);

      function handleRoute() {
        switch (true) {
          case urlString.endsWith('/users/authenticate') && requestOpts.method === 'POST':
            return authenticate();
          case urlString.endsWith('/users') && requestOpts.method === 'GET':
            return getUsers();
          default:
            return realFetch(url, requestOpts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      function authenticate() {
        const { username, password } = body();
        const user = users.find((x) => x.username === username && x.password === password);
        if (!user) return error('Invalid e-QMS credentials.');

        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          token: 'fake-jwt-token'
        });
      }

      function getUsers() {
        if (!isAuthenticated()) return unauthorized();
        return ok(users);
      }

      function ok(data: FakeUser[] | FakeResponseBody): void {
        resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(JSON.stringify(data)),
          json: () => Promise.resolve(data)
        } as Response);
      }

      function unauthorized() {
        resolve({
          ok: false,
          status: 401,
          text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized session access.' })),
          json: () => Promise.resolve({ message: 'Unauthorized session access.' })
        } as Response);
      }

      function error(message: string) {
        resolve({
          ok: false,
          status: 400,
          text: () => Promise.resolve(JSON.stringify({ message })),
          json: () => Promise.resolve({ message })
        } as Response);
      }

      function isAuthenticated(): boolean {
        const headers = requestOpts.headers as Record<string, string> | undefined;
        return headers?.['Authorization'] === 'Bearer fake-jwt-token';
      }

      function body(): any {
        return requestOpts.body && typeof requestOpts.body === 'string'
          ? JSON.parse(requestOpts.body)
          : {};
      }
    });
  } as typeof window.fetch;
}