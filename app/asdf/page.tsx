'use client'

async function getIdentity() {
  const res = await fetch('https://dev.next.naseong.kim/api/authorization');
  console.log(res);
}

export default function Home() {
  return (
    <main>
      <button onClick={getIdentity}>asdf</button>
  </main>
  )
}