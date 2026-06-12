<template>
  <div class="min-h-screen bg-gray-50">
    <section class="bg-gradient-hero py-16 md:py-20">
      <div class="container mx-auto px-4 max-w-7xl text-center">
        <h1 class="font-display text-4xl md:text-5xl font-bold text-white">Blog</h1>
        <p class="mt-4 text-white/85 max-w-2xl mx-auto">
          Stall updates, short clips and community vibes from T.L.O.U. Clothing in Tembisa.
        </p>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in posts"
            :key="post.slug"
            class="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            <NuxtLink :to="`/blog/${post.slug}`" class="block aspect-video bg-gray-100 overflow-hidden relative">
              <img
                v-if="post.image"
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-contain p-2"
                loading="lazy"
              />
              <span
                v-if="post.type === 'video'"
                class="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full"
              >
                Video
              </span>
            </NuxtLink>
            <div class="p-6 flex flex-col flex-1">
              <div class="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <span class="text-primary font-medium">{{ post.category }}</span>
                <span>·</span>
                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              </div>
              <h2 class="font-display text-xl font-semibold mb-2">
                <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-primary">{{ post.title }}</NuxtLink>
              </h2>
              <p class="text-sm text-muted-foreground flex-1">{{ post.excerpt }}</p>
              <NuxtLink
                :to="`/blog/${post.slug}`"
                class="inline-block mt-4 text-sm font-medium text-primary hover:underline"
              >
                {{ post.type === 'video' ? 'Watch clip' : 'Read more' }} →
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '~/data/blog-posts'

const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

useHead({ title: 'Blog — T.L.O.U. Clothing' })
</script>
