import { NewsArticle, NewsSource } from "@/types";

export const dummyArticles: NewsArticle[] = [
  {
    id: "1",
    title:
      "Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning",
    description:
      "Scientists at leading tech companies have developed a new AI model that demonstrates unprecedented capabilities in reasoning and problem-solving.",
    content: `In a groundbreaking development that could reshape the future of artificial intelligence, researchers have unveiled a revolutionary AI system that demonstrates human-like reasoning capabilities. This breakthrough represents years of intensive research and development in the field of machine learning.

The new system, developed through collaborative efforts between leading technology companies and academic institutions, shows remarkable improvements in understanding context, making logical inferences, and solving complex problems that previously required human intervention.

Key features of this breakthrough include:
- Advanced natural language understanding
- Improved reasoning capabilities
- Better contextual awareness
- Enhanced problem-solving skills

The implications of this development extend far beyond the technology sector, potentially transforming industries such as healthcare, education, finance, and scientific research. Experts predict that this advancement could accelerate the development of more sophisticated AI applications and services.

However, the breakthrough also raises important questions about the future of work, privacy, and the ethical implications of increasingly powerful AI systems. Researchers emphasize the need for responsible development and deployment of these technologies.

The research team plans to continue refining the system and exploring its potential applications while working closely with policymakers and ethicists to ensure responsible implementation.`,
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/ai-breakthrough",
    sourceName: "TechNews Today",
    category: "technology",
    publishedAt: "2024-01-15T10:30:00Z",
    author: "Dr. Sarah Chen",
  },
  {
    id: "2",
    title:
      "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
    description:
      "World leaders unite in unprecedented commitment to reduce global carbon emissions by 50% within the next decade.",
    content: `World leaders have reached a historic agreement at the Global Climate Summit, committing to ambitious targets for reducing carbon emissions and combating climate change. The agreement represents the most significant international climate action since the Paris Agreement.

The comprehensive plan includes binding commitments from major economies to reduce greenhouse gas emissions by 50% by 2034, with interim targets and regular progress reviews. The agreement also establishes a global fund for climate adaptation and renewable energy transition in developing countries.

Key provisions of the agreement:
- Mandatory emission reduction targets
- $500 billion climate fund
- Technology sharing initiatives
- Regular monitoring and reporting

Environmental scientists and activists have praised the agreement as a crucial step forward, though some argue that even more aggressive action is needed to prevent the worst effects of climate change.

The implementation of this agreement will require unprecedented cooperation between nations, significant investment in clean energy infrastructure, and fundamental changes to industrial processes worldwide.`,
    imageUrl:
      "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/climate-summit",
    sourceName: "Global News Network",
    category: "world",
    publishedAt: "2024-01-14T14:20:00Z",
    author: "Michael Rodriguez",
  },
  {
    id: "3",
    title:
      "Breakthrough Medical Treatment Shows Promise for Alzheimer's Disease",
    description:
      "Clinical trials reveal significant improvements in cognitive function for patients with early-stage Alzheimer's disease.",
    content: `A revolutionary medical treatment has shown remarkable promise in clinical trials for treating Alzheimer's disease, offering new hope for millions of patients and their families worldwide. The treatment represents a significant breakthrough in neurodegenerative disease research.

The Phase III clinical trial, conducted across multiple medical centers, demonstrated that the new therapy can slow cognitive decline by up to 35% in patients with early-stage Alzheimer's disease. The treatment works by targeting the underlying biological mechanisms that cause brain cell death.

Trial results showed:
- 35% reduction in cognitive decline
- Improved quality of life scores
- Minimal side effects
- Sustained benefits over 18 months

The treatment combines innovative drug therapy with personalized medicine approaches, tailoring the intervention to each patient's specific genetic and biological profile. This personalized approach has proven crucial to the therapy's success.

Medical experts are cautiously optimistic about the results, noting that while the treatment is not a cure, it represents the most significant advancement in Alzheimer's treatment in decades. The therapy is expected to receive regulatory approval within the next two years.`,
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/alzheimers-breakthrough",
    sourceName: "Medical Journal Today",
    category: "technology",
    publishedAt: "2024-01-13T09:15:00Z",
    author: "Dr. Emily Watson",
  },
  {
    id: "4",
    title: "Major Economic Reforms Announced to Address Global Inflation",
    description:
      "Central banks coordinate unprecedented monetary policy changes to combat rising inflation rates worldwide.",
    content: `Central banks around the world have announced coordinated economic reforms aimed at addressing the persistent global inflation that has affected economies worldwide. The comprehensive package represents the most significant monetary policy coordination since the 2008 financial crisis.

The reforms include adjustments to interest rates, new regulatory frameworks for financial institutions, and innovative approaches to monetary policy that take into account the unique challenges of the modern global economy.

Key reform measures include:
- Coordinated interest rate adjustments
- New inflation targeting frameworks
- Enhanced international cooperation
- Support for emerging economies

Economic analysts predict that these measures could help stabilize global markets and reduce inflationary pressures, though the full effects may not be visible for several months. The reforms also include provisions for supporting vulnerable populations affected by inflation.

The announcement has been met with cautious optimism from financial markets, with early indicators suggesting improved investor confidence. However, economists warn that the success of these measures will depend on continued international cooperation and careful implementation.`,
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/economic-reforms",
    sourceName: "Financial Times Global",
    category: "business",
    publishedAt: "2024-01-12T16:45:00Z",
    author: "James Thompson",
  },
  {
    id: "5",
    title: "Championship Victory Sparks Celebration Across the Nation",
    description:
      "Underdog team's stunning victory in the championship final creates historic moment in sports history.",
    content: `In one of the most dramatic championship finals in recent memory, an underdog team achieved a stunning victory that has sparked celebrations across the nation and created a historic moment in sports history.

The championship game, watched by millions of viewers worldwide, featured incredible displays of skill, determination, and teamwork that culminated in a thrilling finish that will be remembered for years to come.

Highlights of the historic victory:
- Record-breaking attendance
- Unprecedented comeback in final minutes
- Outstanding individual performances
- Emotional celebration scenes

The victory represents more than just a sports achievement, symbolizing perseverance, teamwork, and the power of believing in oneself against all odds. The team's journey to the championship has inspired fans and athletes around the world.

The celebration extended far beyond the stadium, with fans gathering in cities across the country to commemorate this historic achievement. The victory is expected to have lasting impacts on the sport and inspire a new generation of athletes.`,
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/championship-victory",
    sourceName: "Sports Central",
    category: "sports",
    publishedAt: "2024-01-11T20:30:00Z",
    author: "Alex Martinez",
  },
  {
    id: "6",
    title: "Entertainment Industry Embraces New Streaming Technology",
    description:
      "Revolutionary streaming platform promises to transform how audiences consume entertainment content.",
    content: `The entertainment industry is experiencing a technological revolution with the introduction of a groundbreaking streaming platform that promises to fundamentally change how audiences discover, consume, and interact with entertainment content.

The new platform incorporates cutting-edge technology including artificial intelligence, virtual reality integration, and personalized content curation to create an unprecedented viewing experience for users worldwide.

Platform innovations include:
- AI-powered content recommendations
- Interactive viewing experiences
- Virtual reality integration
- Social viewing features

Industry experts predict that this technological advancement will reshape the competitive landscape of streaming services and set new standards for user engagement and content delivery. The platform has already attracted major content creators and production studios.

Early user feedback has been overwhelmingly positive, with particular praise for the platform's intuitive interface and innovative features that enhance the viewing experience. The technology is expected to influence the development of future entertainment platforms.`,
    imageUrl:
      "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/streaming-technology",
    sourceName: "Entertainment Weekly",
    category: "entertainment",
    publishedAt: "2024-01-10T12:00:00Z",
    author: "Lisa Park",
  },
  {
    id: "7",
    title: "Space Exploration Reaches New Milestone with Mars Colony Plans",
    description:
      "International space agencies announce ambitious timeline for establishing the first permanent human settlement on Mars.",
    content: `Space exploration has reached an unprecedented milestone as international space agencies unveiled comprehensive plans for establishing the first permanent human colony on Mars. The ambitious project represents humanity's boldest step toward becoming a multi-planetary species.

The Mars colonization initiative involves collaboration between NASA, ESA, SpaceX, and other leading space organizations. The project timeline spans the next two decades, with the first crewed missions scheduled to depart Earth in 2029.

Mission objectives include:
- Establishing sustainable life support systems
- Creating self-sufficient food production
- Building protective habitats against radiation
- Developing in-situ resource utilization

The technological challenges are immense, requiring innovations in propulsion systems, life support technology, and sustainable agriculture in extreme environments. Scientists have been working on solutions for radiation protection, psychological support for long-duration missions, and emergency protocols.

Public interest in the Mars colony project has reached fever pitch, with millions of applications already submitted for the astronaut selection program. The project is expected to inspire a new generation of scientists, engineers, and explorers while advancing our understanding of planetary science and human adaptation.`,
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/mars-colony",
    sourceName: "Space Today",
    category: "technology",
    publishedAt: "2024-01-16T08:45:00Z",
    author: "Dr. Maria Gonzalez",
  },
  {
    id: "8",
    title: "Political Reform Movement Gains Momentum Across Multiple Nations",
    description:
      "Citizens worldwide demand greater transparency and accountability from their governments in coordinated reform efforts.",
    content: `A grassroots political reform movement has gained significant momentum across multiple nations, with citizens demanding greater transparency, accountability, and democratic participation from their governments. The movement represents one of the largest coordinated efforts for political change in recent history.

The reform initiatives focus on several key areas including campaign finance reform, lobbying restrictions, term limits for elected officials, and enhanced transparency in government decision-making processes. Citizens are utilizing both traditional and digital platforms to organize and advocate for change.

Key reform demands include:
- Stricter campaign finance regulations
- Enhanced government transparency measures
- Anti-corruption enforcement mechanisms
- Expanded citizen participation in policy-making

Political scientists note that this movement reflects growing dissatisfaction with traditional political systems and a desire for more responsive governance. The use of social media and digital organizing tools has enabled unprecedented coordination between reform groups across different countries.

Government responses have varied, with some nations embracing reform proposals while others have resisted change. The movement's success will likely depend on sustained citizen engagement and the ability to translate grassroots energy into concrete policy changes.`,
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/political-reform",
    sourceName: "Democracy Watch",
    category: "politics",
    publishedAt: "2024-01-15T16:20:00Z",
    author: "Robert Kim",
  },
  {
    id: "9",
    title: "Renewable Energy Breakthrough Promises Cheaper Solar Power",
    description:
      "New photovoltaic technology achieves record efficiency rates while dramatically reducing manufacturing costs.",
    content: `Researchers have achieved a major breakthrough in renewable energy technology with the development of next-generation photovoltaic cells that promise to make solar power significantly more affordable and efficient. The innovation could accelerate the global transition to clean energy.

The new solar cell technology utilizes advanced materials and manufacturing processes to achieve efficiency rates exceeding 30%, while simultaneously reducing production costs by up to 40%. This combination of improved performance and lower costs addresses two major barriers to widespread solar adoption.

Technical innovations include:
- Perovskite-silicon tandem cell architecture
- Advanced light-trapping mechanisms
- Streamlined manufacturing processes
- Enhanced durability and longevity

The breakthrough comes at a critical time as nations worldwide seek to meet ambitious climate targets and reduce dependence on fossil fuels. Energy analysts predict that this technology could make solar power the cheapest form of electricity generation in most regions within the next five years.

Major energy companies and governments have already expressed interest in scaling up production of the new solar cells. The technology is expected to create thousands of jobs in the renewable energy sector while contributing significantly to global decarbonization efforts.`,
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/solar-breakthrough",
    sourceName: "Clean Energy Report",
    category: "technology",
    publishedAt: "2024-01-14T11:30:00Z",
    author: "Dr. Jennifer Liu",
  },
  {
    id: "10",
    title: "Olympic Games Preparation Showcases Innovative Sports Technology",
    description:
      "Cutting-edge technology and sustainable practices take center stage in upcoming Olympic Games preparations.",
    content: `Preparations for the upcoming Olympic Games are showcasing revolutionary sports technology and sustainable practices that promise to transform the future of international athletic competition. The games will serve as a testing ground for innovations that could reshape sports worldwide.

The technological innovations span multiple areas including athlete performance monitoring, venue sustainability, spectator experience enhancement, and broadcast technology. Organizers have prioritized environmental responsibility while maintaining the highest standards of athletic competition.

Key innovations include:
- AI-powered performance analytics for athletes
- Carbon-neutral venue operations
- Immersive virtual reality experiences for remote viewers
- Advanced anti-doping detection systems

Athletes are benefiting from sophisticated training tools that provide real-time biomechanical analysis and personalized coaching recommendations. The technology helps optimize performance while reducing injury risk through better movement analysis and recovery monitoring.

Sustainability measures include renewable energy systems, waste reduction programs, and eco-friendly construction materials for new venues. The games aim to set new standards for environmentally responsible major sporting events.

The integration of technology and sustainability in these Olympic Games is expected to influence future sporting events and demonstrate how innovation can enhance both athletic performance and environmental stewardship.`,
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/olympic-tech",
    sourceName: "Olympic News Network",
    category: "sports",
    publishedAt: "2024-01-13T14:15:00Z",
    author: "Carlos Rodriguez",
  },
  {
    id: "11",
    title: "Streaming Wars Heat Up with New Interactive Entertainment Platform",
    description:
      "Revolutionary platform combines gaming, social media, and traditional streaming in unprecedented entertainment experience.",
    content: `The entertainment industry's streaming wars have intensified with the launch of a groundbreaking interactive platform that seamlessly combines gaming, social media, and traditional video streaming into a unified entertainment experience. The platform represents a paradigm shift in how audiences consume and interact with content.

The innovative platform allows viewers to influence storylines in real-time, participate in live gaming sessions with content creators, and engage in social experiences while watching their favorite shows. This level of interactivity has never been achieved at such scale in the entertainment industry.

Platform features include:
- Real-time story branching based on audience choices
- Integrated gaming experiences within shows
- Social viewing parties with interactive elements
- Creator collaboration tools for audience engagement

Early adopters have praised the platform's ability to transform passive viewing into active participation. Content creators are experimenting with new formats that blur the lines between traditional media, gaming, and social interaction.

Industry analysts predict that this interactive approach could become the new standard for entertainment platforms, forcing competitors to innovate or risk obsolescence. The platform has already attracted major studios and independent creators eager to explore new storytelling possibilities.

The success of this platform could fundamentally change how entertainment content is produced, distributed, and consumed in the digital age.`,
    imageUrl:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/interactive-streaming",
    sourceName: "Digital Entertainment Today",
    category: "entertainment",
    publishedAt: "2024-01-12T09:45:00Z",
    author: "Amanda Foster",
  },
  {
    id: "12",
    title: "Global Supply Chain Revolution Driven by Automation and AI",
    description:
      "Advanced robotics and artificial intelligence transform logistics industry, promising faster delivery and reduced costs.",
    content: `The global supply chain industry is undergoing a revolutionary transformation driven by advanced automation and artificial intelligence technologies. These innovations promise to deliver faster, more efficient, and cost-effective logistics solutions while addressing persistent supply chain challenges.

Companies worldwide are implementing sophisticated robotic systems, AI-powered demand forecasting, and autonomous delivery vehicles to streamline operations from warehouse to doorstep. The technology integration is reshaping traditional logistics models and creating new possibilities for global commerce.

Key technological advances include:
- Fully automated warehouse systems
- Predictive analytics for demand forecasting
- Autonomous delivery drones and vehicles
- Blockchain-based supply chain transparency

The automation revolution is particularly impactful in addressing labor shortages and improving workplace safety in logistics operations. Robotic systems can work continuously while handling dangerous or repetitive tasks, allowing human workers to focus on higher-value activities.

Environmental benefits are also significant, with optimized routing algorithms reducing fuel consumption and emissions. The technology enables more efficient packaging and reduces waste throughout the supply chain.

Industry experts predict that these technological advances will make same-day delivery standard in urban areas while reducing overall logistics costs by up to 30% within the next decade.`,
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/supply-chain-ai",
    sourceName: "Logistics Weekly",
    category: "business",
    publishedAt: "2024-01-11T13:20:00Z",
    author: "David Chen",
  },
  {
    id: "13",
    title: "International Trade Agreement Reshapes Global Economic Landscape",
    description:
      "Historic multilateral trade deal promises to boost economic growth while addressing environmental and labor concerns.",
    content: `A historic multilateral trade agreement involving major economies has been finalized, promising to reshape the global economic landscape while incorporating unprecedented environmental and labor protections. The comprehensive deal represents years of complex negotiations and compromise.

The agreement covers trade relationships between nations representing over 60% of global GDP, establishing new frameworks for commerce, technology transfer, and sustainable development. Unlike previous trade deals, this agreement prioritizes environmental sustainability and worker rights alongside economic growth.

Key provisions include:
- Reduced tariffs on green technology products
- Mandatory labor standards enforcement
- Environmental protection requirements
- Digital trade facilitation measures

The deal includes innovative mechanisms for addressing climate change through trade policy, incentivizing clean technology adoption and penalizing environmentally harmful practices. Labor provisions ensure fair wages and safe working conditions across participating nations.

Economic analysts project that the agreement could boost global GDP by 2-3% over the next decade while accelerating the transition to sustainable economic practices. Small and medium enterprises are expected to benefit significantly from reduced trade barriers and simplified procedures.

Critics argue that some provisions may not go far enough in addressing inequality and environmental concerns, while supporters emphasize the agreement's potential to demonstrate that economic growth and sustainability can be mutually reinforcing.`,
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/trade-agreement",
    sourceName: "Global Economics Review",
    category: "business",
    publishedAt: "2024-01-10T15:30:00Z",
    author: "Elena Petrov",
  },
  {
    id: "14",
    title: "Breakthrough Gene Therapy Shows Promise for Rare Diseases",
    description:
      "Revolutionary treatment approach offers hope for patients with previously incurable genetic conditions.",
    content: `Medical researchers have achieved a significant breakthrough in gene therapy, developing treatments that show remarkable promise for patients suffering from rare genetic diseases. The innovative approach could transform treatment options for millions of people worldwide with previously incurable conditions.

The gene therapy technique uses advanced CRISPR technology combined with novel delivery systems to correct genetic defects at the cellular level. Clinical trials have demonstrated unprecedented success rates in treating conditions that have historically had no effective treatments.

Treatment innovations include:
- Precision gene editing capabilities
- Targeted delivery to specific organs
- Minimal side effects compared to traditional therapies
- Long-lasting therapeutic benefits

The breakthrough is particularly significant for pediatric patients with rare genetic disorders, offering hope for normal development and improved quality of life. Families who have struggled with limited treatment options now have reason for optimism.

Regulatory agencies are fast-tracking approval processes for the most promising therapies, recognizing the urgent need for effective treatments for rare diseases. The success of these gene therapies could pave the way for treating more common genetic conditions in the future.

The research represents a collaboration between leading medical institutions, biotechnology companies, and patient advocacy groups, demonstrating the power of coordinated efforts in advancing medical science.`,
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/gene-therapy",
    sourceName: "Medical Breakthrough Journal",
    category: "technology",
    publishedAt: "2024-01-09T10:15:00Z",
    author: "Dr. Rachel Thompson",
  },
  {
    id: "15",
    title: "Cybersecurity Threats Evolve as Digital Infrastructure Expands",
    description:
      "Security experts warn of sophisticated new attack vectors targeting critical infrastructure and personal data.",
    content: `Cybersecurity experts are raising alarms about increasingly sophisticated threats targeting both critical infrastructure and personal data as digital systems become more interconnected. The evolving threat landscape requires new approaches to protection and response.

Recent attacks have demonstrated unprecedented levels of coordination and technical sophistication, targeting everything from power grids and financial systems to healthcare networks and personal devices. The interconnected nature of modern digital infrastructure creates new vulnerabilities that malicious actors are actively exploiting.

Emerging threat categories include:
- AI-powered social engineering attacks
- Quantum computing threats to encryption
- Supply chain infiltration techniques
- IoT device exploitation networks

Security professionals are developing advanced defense strategies that leverage artificial intelligence and machine learning to detect and respond to threats in real-time. These systems can identify patterns and anomalies that would be impossible for human analysts to detect manually.

International cooperation on cybersecurity has become essential as attacks increasingly cross national boundaries. Governments and private sector organizations are working together to share threat intelligence and coordinate response efforts.

The cybersecurity industry is experiencing rapid growth as organizations invest heavily in protecting their digital assets and maintaining customer trust in an increasingly connected world.`,
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/cybersecurity-threats",
    sourceName: "Security Today",
    category: "technology",
    publishedAt: "2024-01-08T12:40:00Z",
    author: "Marcus Johnson",
  },
  {
    id: "16",
    title: "Cultural Renaissance Emerges from Digital Art and NFT Innovation",
    description:
      "Artists worldwide embrace blockchain technology to create new forms of digital expression and ownership.",
    content: `A cultural renaissance is emerging as artists worldwide embrace blockchain technology and NFTs to create innovative forms of digital expression and establish new models of artistic ownership. This movement is reshaping how art is created, distributed, and valued in the digital age.

Digital artists are experimenting with interactive, programmable, and evolving artworks that exist purely in digital spaces. These creations challenge traditional notions of art ownership and authenticity while opening new revenue streams for creators.

Innovation areas include:
- Programmable art that changes over time
- Interactive installations in virtual spaces
- Collaborative creation platforms
- Decentralized art marketplaces

The movement has democratized art creation and distribution, allowing artists from diverse backgrounds to reach global audiences without traditional gatekeepers. This has led to increased representation and new artistic voices gaining prominence.

Museums and galleries are adapting to showcase digital art, creating immersive experiences that blend physical and virtual spaces. Educational institutions are developing new curricula to prepare artists for this evolving landscape.

Critics debate the environmental impact and speculative nature of some NFT markets, while supporters emphasize the technology's potential to empower artists and create new forms of cultural expression.

The digital art renaissance represents a fundamental shift in how society creates, shares, and values artistic expression in the 21st century.`,
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/digital-art-renaissance",
    sourceName: "Culture & Technology Review",
    category: "entertainment",
    publishedAt: "2024-01-07T16:25:00Z",
    author: "Sofia Martinez",
  },
  {
    id: "17",
    title: "Urban Planning Revolution Embraces Smart City Technologies",
    description:
      "Cities worldwide implement IoT sensors, AI analytics, and sustainable design to improve quality of life for residents.",
    content: `Urban planning is undergoing a revolutionary transformation as cities worldwide implement smart technologies to address challenges ranging from traffic congestion to environmental sustainability. These innovations promise to significantly improve quality of life for urban residents.

Smart city initiatives integrate Internet of Things sensors, artificial intelligence analytics, and sustainable design principles to create more efficient, livable, and environmentally friendly urban environments. The comprehensive approach addresses multiple urban challenges simultaneously.

Key smart city features include:
- Intelligent traffic management systems
- Real-time air quality monitoring
- Optimized energy distribution networks
- Predictive maintenance for infrastructure

The technology enables city planners to make data-driven decisions based on real-time information about how residents use urban spaces. This leads to more efficient resource allocation and better-designed public services.

Sustainability is a central focus, with smart cities implementing renewable energy systems, waste reduction programs, and green building standards. These initiatives help cities reduce their environmental footprint while improving livability.

Citizen engagement platforms allow residents to participate directly in city planning decisions and report issues in real-time. This increased participation leads to more responsive governance and better outcomes for communities.

The smart city revolution represents a fundamental shift toward more sustainable, efficient, and citizen-centered urban development.`,
    imageUrl:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/smart-cities",
    sourceName: "Urban Innovation Today",
    category: "technology",
    publishedAt: "2024-01-06T14:10:00Z",
    author: "Dr. Ahmed Hassan",
  },
  {
    id: "18",
    title: "Mental Health Awareness Campaign Reaches Global Milestone",
    description:
      "Worldwide initiative successfully reduces stigma and increases access to mental health resources across diverse communities.",
    content: `A comprehensive global mental health awareness campaign has reached a significant milestone, successfully reducing stigma and dramatically increasing access to mental health resources across diverse communities worldwide. The initiative represents one of the most successful public health campaigns in recent history.

The multi-year campaign utilized innovative communication strategies, celebrity endorsements, and grassroots organizing to change public perceptions about mental health. The effort has resulted in measurable improvements in help-seeking behavior and treatment outcomes.

Campaign achievements include:
- 40% increase in mental health service utilization
- Significant reduction in reported stigma
- Expanded insurance coverage for mental health
- Integration of mental health education in schools

The campaign's success stems from its culturally sensitive approach, adapting messages and strategies to resonate with different communities while maintaining core themes of hope, recovery, and support. Local organizations played crucial roles in implementation and outreach.

Technology played a significant role, with mental health apps, online therapy platforms, and digital support groups making resources more accessible to people who might not otherwise seek help. These tools have been particularly valuable for reaching young people and underserved communities.

The campaign's impact extends beyond individual treatment, influencing workplace policies, educational curricula, and healthcare system reforms that prioritize mental health as an essential component of overall wellness.`,
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    sourceUrl: "https://example.com/mental-health-campaign",
    sourceName: "Health & Wellness Report",
    category: "world",
    publishedAt: "2024-01-05T11:55:00Z",
    author: "Dr. Patricia Williams",
  },
];

export const dummySources: NewsSource[] = [
  {
    id: "1",
    name: "TechCrunch",
    description: "Leading technology news and startup coverage",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "news",
    isFollowing: false,
    url: "https://techcrunch.com",
  },
  {
    id: "2",
    name: "The Verge",
    description: "Technology, science, art, and culture news",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "news",
    isFollowing: true,
    url: "https://theverge.com",
  },
  {
    id: "3",
    name: "Coding with John",
    description: "Programming tutorials and tech insights",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "youtube",
    isFollowing: false,
    url: "https://youtube.com/@CodingWithJohn",
  },
  {
    id: "4",
    name: "Morning Brew",
    description: "Daily business and tech newsletter",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "newsletter",
    isFollowing: true,
    url: "https://morningbrew.com",
  },
  {
    id: "5",
    name: "Hacker News",
    description: "Social news website focusing on computer science",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "website",
    isFollowing: false,
    url: "https://news.ycombinator.com",
  },
  {
    id: "6",
    name: "Dev.to",
    description: "Community of software developers sharing knowledge",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "blog",
    isFollowing: true,
    url: "https://dev.to",
  },
  {
    id: "7",
    name: "Wired Magazine",
    description:
      "Technology, culture, and their impact on politics, the economy, and society",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "news",
    isFollowing: false,
    url: "https://wired.com",
  },
  {
    id: "8",
    name: "Lex Fridman Podcast",
    description:
      "Conversations about AI, science, technology, history, philosophy and the nature of intelligence",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "youtube",
    isFollowing: true,
    url: "https://youtube.com/@lexfridman",
  },
  {
    id: "9",
    name: "The Hustle",
    description:
      "Daily newsletter covering business, tech, and culture with a sense of humor",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "newsletter",
    isFollowing: false,
    url: "https://thehustle.co",
  },
  {
    id: "10",
    name: "MIT Technology Review",
    description: "Emerging technology and its impact on business and society",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "news",
    isFollowing: true,
    url: "https://technologyreview.com",
  },
  {
    id: "11",
    name: "Fireship",
    description: "High-intensity code tutorials and tech news in 100 seconds",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "youtube",
    isFollowing: false,
    url: "https://youtube.com/@Fireship",
  },
  {
    id: "12",
    name: "Benedict Evans Newsletter",
    description: "Weekly analysis of technology trends and their implications",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "newsletter",
    isFollowing: true,
    url: "https://benedictevans.com",
  },
  {
    id: "13",
    name: "Stratechery",
    description:
      "Analysis of the strategy and business side of technology and media",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "blog",
    isFollowing: false,
    url: "https://stratechery.com",
  },
  {
    id: "14",
    name: "Axios",
    description:
      "Smart brevity on politics, business, technology, and media trends",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "news",
    isFollowing: true,
    url: "https://axios.com",
  },
  {
    id: "15",
    name: "Marques Brownlee",
    description: "Quality tech videos covering the latest consumer technology",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "youtube",
    isFollowing: false,
    url: "https://youtube.com/@MKBHD",
  },
  {
    id: "16",
    name: "Product Hunt Daily",
    description: "Daily digest of the best new products and startups",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "newsletter",
    isFollowing: true,
    url: "https://producthunt.com",
  },
  {
    id: "17",
    name: "A16Z Blog",
    description: "Insights on technology trends from Andreessen Horowitz",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "blog",
    isFollowing: false,
    url: "https://a16z.com/blog",
  },
  {
    id: "18",
    name: "Reuters Technology",
    description:
      "Breaking news and analysis on technology companies and trends",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "news",
    isFollowing: true,
    url: "https://reuters.com/technology",
  },
  {
    id: "19",
    name: "3Blue1Brown",
    description:
      "Mathematics and science explained through beautiful animations",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "youtube",
    isFollowing: false,
    url: "https://youtube.com/@3blue1brown",
  },
  {
    id: "20",
    name: "First Round Review",
    description: "Tactical advice for startup founders and operators",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
    type: "blog",
    isFollowing: true,
    url: "https://review.firstround.com",
  },
];

export const categories = [
  { id: "top", name: "Top", icon: "🔥" },
  { id: "trending", name: "Trending", icon: "📈" },
  { id: "latest", name: "Latest", icon: "🕐" },
  { id: "politics", name: "Politics", icon: "🏛️" },
  { id: "technology", name: "Technology", icon: "💻" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "world", name: "World", icon: "🌍" },
];
