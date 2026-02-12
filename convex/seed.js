import { mutation } from "./_generated/server";

// Static data for seeding
const features = [
  {
    title: "AI Writing Assistant",
    desc: "Get smart suggestions for titles, content, and SEO optimization",
    color: "from-purple-500 to-blue-500",
  },
  {
    title: "Community Building",
    desc: "Grow your audience with followers, comments, and engagement tools",
    color: "from-green-500 to-yellow-500",
  },
  {
    title: "Analytics & Insights",
    desc: "Track performance with detailed view counts and engagement metrics",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Content Scheduling",
    desc: "Plan and schedule your content with real-time updates",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "AI Image Transformations",
    desc: "Transform images with background removal, smart crop, and text overlays",
    color: "from-red-500 to-purple-500",
  },
  {
    title: "Content Discovery",
    desc: "Explore trending content and discover new creators in your feed",
    color: "from-emerald-500 to-green-500",
  },
];

const socialProofStats = [
  { metric: "50K+", label: "Active Creators" },
  { metric: "2M+", label: "Published Posts" },
  { metric: "10M+", label: "Monthly Readers" },
  { metric: "99.9%", label: "Uptime" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Tech Blogger",
    company: "@TechInsights",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    content: "Creatr transformed how I create content. The AI writing assistant saves me hours every week.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Newsletter Creator",
    company: "@MarketingWeekly",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "The email newsletter features are incredible. My subscriber growth increased by 300% in just 3 months.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Content Strategist",
    company: "@CreativeSpace",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "Best investment I've made for my content business. The analytics help me understand what my audience loves.",
    rating: 5,
  },
];

const platformTabs = [
  {
    title: "Content Creation",
    description: "AI-powered writing tools that help you create engaging content faster than ever before.",
    features: [
      "Smart title suggestions",
      "Content optimization",
      "SEO recommendations",
      "Plagiarism detection",
    ],
  },
  {
    title: "Audience Growth",
    description: "Build and engage your community with powerful audience management tools.",
    features: [
      "Follower analytics",
      "Engagement tracking",
      "Community insights",
      "Growth recommendations",
    ],
  },
  {
    title: "Content Management",
    description: "Organize and manage your content with comprehensive tools and analytics.",
    features: [
      "Draft system",
      "Post scheduling",
      "Content analytics",
      "Media management",
    ],
  },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data first
    const existingUsers = await ctx.db.query("users").collect();
    const existingPosts = await ctx.db.query("posts").collect();
    const existingFeatures = await ctx.db.query("features").collect();
    
    // Delete existing data
    for (const user of existingUsers) {
      await ctx.db.delete(user._id);
    }
    for (const post of existingPosts) {
      await ctx.db.delete(post._id);
    }
    for (const feature of existingFeatures) {
      await ctx.db.delete(feature._id);
    }
    
    // Also clear other tables
    const existingStats = await ctx.db.query("socialProofStats").collect();
    const existingTestimonials = await ctx.db.query("testimonials").collect();
    const existingTabs = await ctx.db.query("platformTabs").collect();
    const existingComments = await ctx.db.query("comments").collect();
    const existingLikes = await ctx.db.query("likes").collect();
    const existingFollows = await ctx.db.query("follows").collect();
    const existingStatsData = await ctx.db.query("dailyStats").collect();
    
    for (const stat of existingStats) await ctx.db.delete(stat._id);
    for (const testimonial of existingTestimonials) await ctx.db.delete(testimonial._id);
    for (const tab of existingTabs) await ctx.db.delete(tab._id);
    for (const comment of existingComments) await ctx.db.delete(comment._id);
    for (const like of existingLikes) await ctx.db.delete(like._id);
    for (const follow of existingFollows) await ctx.db.delete(follow._id);
    for (const stat of existingStatsData) await ctx.db.delete(stat._id);

    // Create sample users
    const user1 = await ctx.db.insert("users", {
      name: "Alice Johnson",
      email: "alice@example.com",
      tokenIdentifier: "sample-user-1",
      imageUrl: "https://example.com/alice.jpg",
      username: "alicej",
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

    const user2 = await ctx.db.insert("users", {
      name: "Bob Smith",
      email: "bob@example.com",
      tokenIdentifier: "sample-user-2",
      imageUrl: "https://example.com/bob.jpg",
      username: "bobsmith",
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

    const user3 = await ctx.db.insert("users", {
      name: "Charlie Brown",
      email: "charlie@example.com",
      tokenIdentifier: "sample-user-3",
      imageUrl: "https://example.com/charlie.jpg",
      username: "charlieb",
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

    // Create sample posts
    const post1 = await ctx.db.insert("posts", {
      title: "Getting Started with AI Content Creation",
      content: "AI content creation is revolutionizing the way we produce and consume content. In this post, we'll explore the basics of using AI tools to generate high-quality articles, images, and more.",
      status: "published",
      authorId: user1,
      tags: ["AI", "Content Creation", "Tutorial"],
      category: "Technology",
      featuredImage: "https://example.com/ai-content.jpg",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      publishedAt: Date.now(),
      viewCount: 150,
      likeCount: 25,
    });

    const post2 = await ctx.db.insert("posts", {
      title: "The Future of Social Media Marketing",
      content: "Social media marketing continues to evolve with new platforms and algorithms. Learn about the latest trends and strategies for effective social media campaigns.",
      status: "published",
      authorId: user2,
      tags: ["Social Media", "Marketing", "Trends"],
      category: "Marketing",
      featuredImage: "https://example.com/social-media.jpg",
      createdAt: Date.now() - 86400000, // 1 day ago
      updatedAt: Date.now() - 86400000,
      publishedAt: Date.now() - 86400000,
      viewCount: 200,
      likeCount: 40,
    });

    const post3 = await ctx.db.insert("posts", {
      title: "Building Scalable Web Applications",
      content: "Scalability is crucial for modern web applications. This guide covers best practices for building applications that can handle growth and increased user demand.",
      status: "published",
      authorId: user3,
      tags: ["Web Development", "Scalability", "Best Practices"],
      category: "Development",
      featuredImage: "https://example.com/scalable-apps.jpg",
      createdAt: Date.now() - 172800000, // 2 days ago
      updatedAt: Date.now() - 172800000,
      publishedAt: Date.now() - 172800000,
      viewCount: 300,
      likeCount: 60,
    });

    // Create some follows
    await ctx.db.insert("follows", {
      followerId: user1,
      followingId: user2,
      createdAt: Date.now(),
    });

    await ctx.db.insert("follows", {
      followerId: user1,
      followingId: user3,
      createdAt: Date.now(),
    });

    await ctx.db.insert("follows", {
      followerId: user2,
      followingId: user3,
      createdAt: Date.now(),
    });

    // Create some likes
    await ctx.db.insert("likes", {
      postId: post1,
      userId: user2,
      createdAt: Date.now(),
    });

    await ctx.db.insert("likes", {
      postId: post1,
      userId: user3,
      createdAt: Date.now(),
    });

    await ctx.db.insert("likes", {
      postId: post2,
      userId: user1,
      createdAt: Date.now(),
    });

    // Create some comments
    await ctx.db.insert("comments", {
      postId: post1,
      authorId: user2,
      authorName: "Bob Smith",
      content: "Great article! Really helpful for beginners.",
      status: "approved",
      createdAt: Date.now(),
    });

    await ctx.db.insert("comments", {
      postId: post2,
      authorId: user3,
      authorName: "Charlie Brown",
      content: "I agree, social media is changing rapidly. Thanks for the insights!",
      status: "approved",
      createdAt: Date.now() - 3600000, // 1 hour ago
    });

    // Insert static landing page data
    await ctx.db.insert("features", {
      icon: "PenTool",
      title: "AI Writing Assistant",
      desc: "Get smart suggestions for titles, content, and SEO optimization",
      color: "from-purple-500 to-blue-500",
    });
    
    await ctx.db.insert("features", {
      icon: "Users",
      title: "Community Building", 
      desc: "Grow your audience with followers, comments, and engagement tools",
      color: "from-green-500 to-yellow-500",
    });
    
    await ctx.db.insert("features", {
      icon: "BarChart3",
      title: "Analytics & Insights",
      desc: "Track performance with detailed view counts and engagement metrics",
      color: "from-yellow-500 to-orange-500",
    });
    
    await ctx.db.insert("features", {
      icon: "Calendar",
      title: "Content Scheduling",
      desc: "Plan and schedule your content with real-time updates",
      color: "from-orange-500 to-red-500",
    });
    
    await ctx.db.insert("features", {
      icon: "ImageIcon",
      title: "AI Image Transformations",
      desc: "Transform images with background removal, smart crop, and text overlays",
      color: "from-red-500 to-purple-500",
    });
    
    await ctx.db.insert("features", {
      icon: "Search",
      title: "Content Discovery",
      desc: "Explore trending content and discover new creators in your feed",
      color: "from-emerald-500 to-green-500",
    });

    await ctx.db.insert("socialProofStats", {
      metric: "50K+",
      label: "Active Creators",
      icon: "Users",
    });
    
    await ctx.db.insert("socialProofStats", {
      metric: "2M+",
      label: "Published Posts", 
      icon: "PenTool",
    });
    
    await ctx.db.insert("socialProofStats", {
      metric: "10M+",
      label: "Monthly Readers",
      icon: "Eye",
    });
    
    await ctx.db.insert("socialProofStats", {
      metric: "99.9%",
      label: "Uptime",
      icon: "Shield",
    });

    await ctx.db.insert("testimonials", {
      name: "Sarah Chen",
      role: "Tech Blogger",
      company: "@TechInsights",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "Creatr transformed how I create content. The AI writing assistant saves me hours every week.",
      rating: 5,
    });
    
    await ctx.db.insert("testimonials", {
      name: "Marcus Johnson",
      role: "Newsletter Creator", 
      company: "@MarketingWeekly",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "The email newsletter features are incredible. My subscriber growth increased by 300% in just 3 months.",
      rating: 5,
    });
    
    await ctx.db.insert("testimonials", {
      name: "Elena Rodriguez",
      role: "Content Strategist",
      company: "@CreativeSpace", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "Best investment I've made for my content business. The analytics help me understand what my audience loves.",
      rating: 5,
    });

    await ctx.db.insert("platformTabs", {
      title: "Content Creation",
      icon: "PenTool",
      description: "AI-powered writing tools that help you create engaging content faster than ever before.",
      features: [
        "Smart title suggestions",
        "Content optimization", 
        "SEO recommendations",
        "Plagiarism detection",
      ],
    });
    
    await ctx.db.insert("platformTabs", {
      title: "Audience Growth",
      icon: "TrendingUp",
      description: "Build and engage your community with powerful audience management tools.",
      features: [
        "Follower analytics",
        "Engagement tracking",
        "Community insights",
        "Growth recommendations",
      ],
    });
    
    await ctx.db.insert("platformTabs", {
      title: "Content Management",
      icon: "Settings",
      description: "Organize and manage your content with comprehensive tools and analytics.",
      features: [
        "Draft system",
        "Post scheduling",
        "Content analytics", 
        "Media management",
      ],
    });

    return {
      message: "Database seeded successfully with sample data",
      users: [user1, user2, user3],
      posts: [post1, post2, post3],
    };
  },
});