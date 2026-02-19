'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) fetchBookmarks(data.user.id)
    })
  }, [])

  const fetchBookmarks = async (uid: string) => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', uid)
      .order('id', { ascending: false })

    setBookmarks(data || [])
  }

  const addBookmark = async () => {
    if (!title || !url || !user) return

    await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id,
    })

    setTitle('')
    setUrl('')
    fetchBookmarks(user.id)
  }

  const deleteBookmark = async (id: number) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    fetchBookmarks(user.id)
  }

  if (!user) {
    return <div className="p-10">Please login first</div>
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Bookmarks</h1>

      {/* Add Form */}
      <div className="flex gap-2">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1 rounded"
        />

        <input
          placeholder="URL"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 flex-1 rounded"
        />

        <button
          onClick={addBookmark}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Bookmark List */}
      <div className="grid gap-4">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="border rounded-lg p-4 shadow bg-white flex flex-col gap-2"
          >
            <div>
              <div className="text-lg font-semibold">{b.title}</div>
              <div className="text-sm text-gray-600 break-all">{b.url}</div>
            </div>

            <div className="flex gap-3 mt-2">
              <a
                href={b.url}
                target="_blank"
                className="text-blue-600 underline"
              >
                Open Link
              </a>

              <button
                onClick={() => deleteBookmark(b.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

