<template>
  <div v-if="post" class="min-h-screen bg-gray-50">
    <article class="container mx-auto px-4 py-12 max-w-3xl">
      <NuxtLink to="/blog" class="text-sm text-primary hover:underline mb-6 inline-block">← Back to blog</NuxtLink>

      <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span class="text-primary font-medium">{{ post.category }}</span>
        <span>·</span>
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </div>

      <h1 class="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{{ post.title }}</h1>

      <div v-if="post.type === 'video' && post.videoSrc" class="rounded-lg overflow-hidden bg-black mb-8 border">
        <video
          :src="post.videoSrc"
          controls
          playsinline
          preload="metadata"
          class="w-full max-h-[70vh] object-contain mx-auto"
        />
      </div>

      <div v-else-if="post.image" class="rounded-lg overflow-hidden mb-8">
        <img :src="post.image" :alt="post.title" class="w-full h-auto object-cover" />
      </div>

      <div class="prose prose-lg max-w-none text-muted-foreground">
        <p>{{ post.body }}</p>
      </div>

      <div class="mt-10 p-6 bg-white rounded-lg border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p class="text-sm text-muted-foreground">Like what you see? Check stock and order on WhatsApp.</p>
        <a
          :href="whatsappEnquireUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-lg font-medium text-sm shrink-0"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </article>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="font-display text-2xl font-bold mb-4">Post not found</h1>
      <NuxtLink to="/blog" class="text-primary hover:underline">Back to blog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBlogPost } from '~/data/blog-posts'

const route = useRoute()
const { enquireUrl: whatsappEnquireUrl } = useWhatsApp()

const post = computed(() => getBlogPost(route.params.slug as string))

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

useHead(() => ({
  title: post.value ? `${post.value.title} — T.L.O.U. Clothing` : 'Blog — T.L.O.U. Clothing',
}))
</script>
