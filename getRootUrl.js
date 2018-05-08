export default function getRootUrl() {
  const port = process.env.PORT || 3000;
  const dev = process.env.NODE_ENV !== 'production';
  // change production to https://rearn.org
  const ROOT_URL = dev ? `http://localhost:${port}` : 'https://skycop-task.herokuapp.com';

  return ROOT_URL;
}
