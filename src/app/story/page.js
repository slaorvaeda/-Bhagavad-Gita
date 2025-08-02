'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function StoryPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              The Sacred Story of Bhagavad Gita
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Journey into the timeless wisdom that emerged from the battlefield of Kurukshetra
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">The Divine Song of the Lord</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Imagine a scene that would change the course of human history forever. It&apos;s dawn on the sacred battlefield of Kurukshetra, where the morning mist swirls around thousands of warriors, their armor glinting in the rising sun. The air is thick with tension, the sound of war drums echoing across the plains, and the neighing of horses mixing with the clang of weapons being prepared for battle.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In the center of this vast military formation stands a magnificent golden chariot, drawn by five white horses that seem to glow with divine light. On this chariot sits Arjuna, the greatest archer the world has ever known, his Gandiva bow resting beside him. But today, this mighty warrior is not filled with the fire of battle - instead, his heart is heavy with doubt and despair.
              </p>
                             {isExpanded && (
                 <p className="text-lg text-gray-700 leading-relaxed">
                   Beside him sits his charioteer, a figure whose presence seems to radiate an otherworldly calm. This is no ordinary charioteer - this is Lord Krishna, the Supreme Personality of Godhead, who has descended to Earth in human form. What follows is not just a conversation, but the most profound spiritual dialogue ever recorded - the Bhagavad Gita, the Song of God.
                 </p>
               )}
               
               {isExpanded && (
                 <div className="mt-6 space-y-4">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The Bhagavad Gita, often called the &ldquo;Song of God,&rdquo; is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is set in a narrative framework of a dialogue between Pandava prince Arjuna and his guide and charioteer Krishna. At the start of the Dharma Yuddha (righteous war) between Pandavas and Kauravas, Arjuna is filled with deep compassion and despair at the prospect of killing his own relatives.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Krishna counsels Arjuna to &ldquo;fulfill his Kshatriya (warrior) duty to uphold the Dharma&rdquo; through &ldquo;selfless action.&rdquo; The Krishna-Arjuna dialogue covers a broad range of spiritual topics, touching upon ethical dilemmas and philosophical issues that go far beyond the war Arjuna faces.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The Gita&apos;s call for selfless action inspired many leaders of the Indian independence movement including Bal Gangadhar Tilak and Mahatma Gandhi. Gandhi referred to the Gita as his &ldquo;spiritual dictionary.&rdquo; The Gita has been highly praised, not only by prominent Indians including Jawaharlal Nehru and Sarvepalli Radhakrishnan, but also by Aldous Huxley, Henry David Thoreau, J. Robert Oppenheimer, Ralph Waldo Emerson, Carl Jung, Hermann Hesse, and many others.
                  </p>
                </div>
              )}
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {isExpanded ? (
                  <>
                    <span>Read Less</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Read More</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            <div 
              className="relative h-80 rounded-2xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedImage('/devine_song.png')}
            >
              <Image
                src="/devine_song.png"
                alt="Krishna's divine discourse and spiritual teachings"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-2">The Divine Song</h3>
                  <p className="text-sm">Krishna&apos;s timeless wisdom begins</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Background */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Epic Tale That Led to This Moment</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Kingdom of Hastinapura</h3>
              <p className="text-gray-700 leading-relaxed">
                The story begins in the magnificent kingdom of Hastinapura, a land of golden palaces, lush gardens, and prosperous cities. Here ruled the blind king Dhritarashtra, whose heart was clouded by his love for his eldest son Duryodhana. His brother Pandu had five extraordinary sons - Yudhishthira, Bhima, Arjuna, Nakula, and Sahadeva - known as the Pandavas, each blessed with divine qualities.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                From childhood, Duryodhana&apos;s heart burned with jealousy toward his cousins. He saw their virtues, their popularity, and their divine blessings as threats to his own ambitions. This jealousy would grow into a consuming hatred that would eventually destroy everything he held dear.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Great Dice Game</h3>
              <p className="text-gray-700 leading-relaxed">
                The turning point came during a grand celebration in Hastinapura. Duryodhana, consumed by envy, challenged Yudhishthira to a game of dice. But this was no ordinary game - the dice were loaded, the rules were rigged, and Duryodhana&apos;s uncle Shakuni, a master of deception, controlled every throw.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                One by one, Yudhishthira lost everything - his kingdom, his wealth, his brothers, and even his beloved wife Draupadi. The Pandavas were forced into thirteen years of exile in the wilderness, living in forests and mountains, facing countless dangers and hardships. But through it all, they never lost their faith in dharma - the path of righteousness.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The Gathering Storm</h3>
              <p className="text-gray-700 leading-relaxed">
                When the Pandavas returned from exile, they found that Duryodhana had grown even more powerful and arrogant. Despite the terms of their agreement, he refused to return even a single village to his cousins. The entire world seemed to hold its breath as the two sides prepared for the inevitable conflict.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Kurukshetra, the sacred land where ancient sages had performed their austerities, was chosen as the battlefield. Here, under the watchful eyes of the gods themselves, two massive armies gathered - the Pandavas with their allies on one side, and the Kauravas with their vast forces on the other. The stage was set for the greatest war in human history.
              </p>
            </div>
          </div>
        </div>

        {/* The Battlefield Setup */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Sacred Battlefield of Kurukshetra</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="columns-1 md:columns-2 gap-8 text-gray-700 leading-relaxed text-lg">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">The Field of Dharma</h3>
                  <p className="mb-4">
                    Kurukshetra, known as &ldquo;Dharmakshetra&rdquo; (the realm of duty), holds profound significance in Hindu tradition. This sacred land, located in present-day Haryana, India, derives its name from King Kuru, the ancestor of both the Pandavas and Kauravas. According to the Vedas, Kurukshetra was not merely a city but an entire region—&ldquo;kshetra&rdquo; literally meaning &ldquo;region&rdquo; in Sanskrit.
                  </p>
                  <p className="mb-4">
                    The spiritual importance of this battlefield stems from an ancient blessing. As described in the Vamana Purana, King Kuru performed intense spiritual practices on this land, embedding it with eight virtues: austerity, truth, forgiveness, kindness, purity, charity, devotion, and righteous conduct. Lord Vishnu, impressed by these acts, granted two boons—first, that this land would forever be known as Kurukshetra (the land of Kuru), and second, that anyone dying on this land would attain heaven.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">The Divine Narrator</h3>
                  <p className="mb-4">
                    The Bhagavad Gita opens with a seemingly simple yet profound question from Dhritarashtra, the blind king of Hastinapura: &ldquo;O Sanjay, after gathering on the holy field of Kurukshetra, and desiring to fight, what did my sons and the sons of Pandu do?&rdquo;. This question reveals much about the king&apos;s character and concerns.
                  </p>
                  <p className="mb-4">
                    Sanjaya, Dhritarashtra&apos;s trusted minister and charioteer, possessed an extraordinary gift that made him the perfect narrator for these momentous events. As a disciple of Sage Ved Vyas (Vyasa), Sanjaya had been bestowed with &ldquo;divya drishti&rdquo; (divine vision)—the miraculous power to witness distant events within his mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Armies Gather */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Mighty Armies Assemble</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="columns-1 md:columns-2 gap-8 text-gray-700 leading-relaxed text-lg">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Duryodhana&apos;s Strategic Assessment</h3>
                  <p className="mb-4">
                    With calculating eyes, Duryodhana surveyed both armies before approaching his teacher Dronacharya. The Kaurava force boasted eleven akshauhinis (military divisions), while the Pandavas commanded seven—creating a formidable gathering of warriors from across the subcontinent. Each akshauhini contained precisely 21,870 chariots, 21,870 elephants, 65,610 horses, and 109,350 foot soldiers.
                  </p>
                  <p className="mb-4">
                    Among the Kaurava champions stood legendary figures like Bhishma (the supreme commander), Karna (the formidable archer), Kripa (the learned sage-warrior), Ashwatthama (Drona&apos;s powerful son), Vikarna, and Bhurishrava. Duryodhana specifically mentioned these warriors to emphasize their military strength.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">The Pandava Champions</h3>
                  <p className="mb-4">
                    On the Pandava side, equally mighty warriors assembled—Bhima (known for his strength), Arjuna (the peerless archer), the twin brothers Nakula and Sahadeva, King Dhrishtadyumna, Virata, Drupada, Dhrishtaketu, Chekitana, and the mighty king of Kashi. Additionally, warriors like Purujit, Kuntibhoja, Shaibya, Yudhamanyu, Uttamauja, Abhimanyu (Arjuna&apos;s son), and the sons of Draupadi reinforced the Pandava ranks.
                  </p>
                  <p className="mb-4">
                    Each side included maharathis (great chariot warriors) capable of fighting 10,000 warriors simultaneously. The stage was set for what would become not just a physical battle, but the backdrop for humanity&apos;s most profound spiritual discourse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Conch Shells Sound */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Sacred Battle Announcement</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-gray-700 leading-relaxed text-lg">
                <p className="mb-4">
                  After the armies assembled and Duryodhana completed his strategic assessment, both sides announced their presence through the ceremonial blowing of conch shells. This ancient battle tradition served as both communication system and psychological warfare.
                </p>
                                  <p className="mb-4">
                    The thunderous sound began with Bhishma, the Kaurava commander, blowing his conch named &ldquo;Poundra.&rdquo; Subsequently, other instruments joined—drums, kettledrums, and cow-horns—creating what the text describes as &ldquo;tumultuous uproar&rdquo; that &ldquo;shattered the hearts of Dhritarashtra&apos;s sons.&rdquo;
                  </p>
                                  <p className="mb-4">
                    In response, Krishna blew his divine conch &ldquo;Panchajanya,&rdquo; followed by Arjuna&apos;s &ldquo;Devadatta.&rdquo; Bhima the terrible then sounded his &ldquo;Paundra,&rdquo; while King Yudhishthira blew &ldquo;Anantavijaya.&rdquo; Nakula and Sahadeva sounded &ldquo;Sughosha&rdquo; and &ldquo;Manipushpaka&rdquo; respectively. The cacophony continued as King of Kashi, Shikhandi, Dhrishtadyumna, Virata, Satyaki, and other warriors joined with their individual instruments.
                  </p>
                                  <p className="mb-4">
                    This orchestrated soundscape had profound significance beyond mere noise—each warrior&apos;s conch carried a specific name and power, and the order of sounding reflected battle hierarchy. Furthermore, the terrifying sound was designed to demoralize enemies and steel allies for the coming conflict—a critical psychological component of ancient warfare.
                  </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Moment of Crisis */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Arjuna&apos;s Heart-Breaking Realization</h2>
          
          {/* Single Table Container with Image and Text */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Landscape Image at Top */}
            <div 
              className="relative h-96 overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedImage('/Arjuna_Crisis.png')}
            >
              <Image
                src="/Arjuna_Crisis.png"
                alt="Arjuna&apos;s moment of crisis and despair on the battlefield"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Arjuna&apos;s Crisis</h3>
                  <p className="text-lg">The moment of despair that led to divine wisdom</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>

            {/* 3-Column Newspaper Style Text Flow */}
            <div className="p-8">
              <div className="columns-1 md:columns-3 gap-8 text-gray-700 leading-relaxed text-lg">
                <p className="mb-4">
                  As the sun rose higher and the battle horns began to sound, Arjuna turned to his charioteer with a request that would change everything. &ldquo;Krishna,&rdquo; he said, his voice trembling with emotion, &ldquo;please take our chariot to the center of the battlefield. I want to see who I am about to fight.&rdquo;
                </p>
                <p className="mb-4">
                  Krishna skillfully guided the chariot between the two armies, positioning it perfectly so that Arjuna could see both sides clearly. The morning light revealed the vast sea of warriors, their weapons glinting in the sun, their banners fluttering in the breeze.
                </p>
                <p className="mb-4">
                  What Arjuna saw shattered his warrior&apos;s heart. There, standing in the enemy ranks, was his beloved grandfather Bhishma - the man who had carried him on his shoulders as a child, who had taught him the art of war, who had always been his protector and guide.
                </p>
                <p className="mb-4">
                  Next to him stood his revered teacher Drona, who had given him the sacred knowledge of archery, who had been like a father to him. His eyes moved across the battlefield, and everywhere he looked, he saw faces he loved - cousins he had grown up with, friends he had shared meals with.
                </p>
                <p className="mb-4">
                  These were not faceless enemies; these were the people who had shaped his life, who had loved him, who had been part of his family. Overwhelmed by grief and confusion, Arjuna&apos;s mighty arms began to tremble.
                </p>
                <p className="mb-4">
                  His Gandiva bow, which had never failed him in battle, slipped from his grasp and fell to the floor of the chariot. Tears streamed down his face as he cried out, &ldquo;How can I kill my own family? What is the point of victory if it means destroying everything I love? I would rather be killed myself than harm these people who have been so dear to me!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stages of Arjuna's Conflict */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Depths of Arjuna&apos;s Moral Crisis</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Physical Manifestations</h3>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    As Arjuna comprehends the reality of facing his kinsmen in battle, his body betrays his mental anguish. &ldquo;I am unable to stand here any longer. I am forgetting myself, and my mind is reeling,&rdquo; he confesses to Krishna. His legendary steadiness dissolves as his limbs tremble, mouth becomes parched, and skin burns with fever.
                  </p>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Even the Gandiva bow—his trusted weapon—slips from his grasp as his hands grow sweaty. These visceral reactions illustrate how deeply the psychological conflict affects his physical being, essentially creating psychosomatic symptoms that render the warrior temporarily incapacitated.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Moral Confusion</h3>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Beyond physical distress, Arjuna experiences profound moral disorientation. &ldquo;How shall I strike Bhishma and Drona with arrows?&rdquo; he asks, recognizing that these revered figures deserve worship rather than violence. His ethical framework collapses as he contemplates the paradox of achieving victory through sinful acts.
                  </p>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    &ldquo;Better indeed in this world to accept alms than to slay these noble elders,&rdquo; he laments, questioning whether any worldly gain could justify such spiritual transgression. This represents Arjuna&apos;s entanglement in &ldquo;dharma-sankata&rdquo;—a conflict between different aspects of duty.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Family Values</h3>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Arjuna shifts to broader concerns about family destruction. He reasons that killing family members would destroy ancient family traditions, leading to lawlessness among survivors. &ldquo;With the destruction of family, the eternal family traditions perish,&rdquo; he argues, foreseeing that such collapse would cause women&apos;s corruption and create &ldquo;varna-sankara&rdquo; (unwanted progeny).
                  </p>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    His concern extends beyond immediate casualties to the long-term degradation of societal order and family structures. This represents his deep understanding of the interconnectedness of all social systems.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Spiritual Consequences</h3>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Finally, Arjuna expresses anxiety about eternal spiritual consequences. He worries that ancestors would fall from heaven without proper funeral offerings and that survivors would suffer hell-bound fates. &ldquo;Hell awaits those who destroy family traditions,&rdquo; he declares with conviction.
                  </p>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    This represents his ultimate fear—that in pursuing victory, he might secure material triumph yet suffer irredeemable spiritual failure. The chapter culminates with Arjuna casting aside his bow and arrows, overwhelmed by grief (vishada) that ironically marks the beginning of his spiritual enlightenment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Emergence of Arjuna Vishad Yog */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Yoga of Arjuna&apos;s Grief</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="columns-1 md:columns-2 gap-8 text-gray-700 leading-relaxed text-lg">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Grief Becomes Yoga</h3>
                  <p className="mb-4">
                    Vishada (despair) combined with yoga (spiritual discipline) creates a seemingly contradictory term that nevertheless holds deep philosophical significance. In fact, Arjuna&apos;s overwhelming sorrow represents a legitimate spiritual stage rather than mere weakness. The term &ldquo;yoga&rdquo; derives from the Sanskrit root yuj, meaning &ldquo;to join&rdquo; or &ldquo;to unite,&rdquo; and Arjuna&apos;s grief serves precisely this function—connecting him to deeper questions about existence, duty, and purpose.
                  </p>
                  <p className="mb-4">
                    His emotional breakdown strips away his warrior identity, creating the necessary emptiness for spiritual wisdom to enter. Furthermore, his anguish demonstrates qualities essential to spiritual growth: sincerity, emotional honesty, and recognition of one&apos;s limitations. Just as physical yoga postures create beneficial discomfort that leads to growth, Arjuna&apos;s mental suffering creates the necessary tension for spiritual transformation.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">The Power of Surrender</h3>
                  <p className="mb-4">
                    The chapter concludes with a pivotal moment: &ldquo;Sanjaya uvāca: Having spoken thus, Gudakesh, that chastiser of enemies, addressed Hrishikesh: &lsquo;Govinda, I shall not fight,&rsquo; and became silent.&rdquo; This silence represents the complete collapse of Arjuna&apos;s self-sufficiency and marks his transition from warrior to disciple.
                  </p>
                  <p className="mb-4">
                    In verse 2.7, he makes his surrender explicit: &ldquo;I am Your devoted student, and have fully surrendered to You. Please enlighten me on the most appropriate path.&rdquo; This surrender (prapatti) becomes the essential prerequisite for receiving spiritual knowledge. As spiritual traditions often emphasize, knowledge only truly enters when ego diminishes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Krishna's Role */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Divine Charioteer&apos;s Master Plan</h2>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Krishna&apos;s Perfect Timing</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Krishna, the Supreme Lord who had descended to Earth in human form, had been waiting for this exact moment. He had watched as the events unfolded over many years - the jealousy, the deception, the exile, the gathering of armies. He had orchestrated everything perfectly, knowing that Arjuna&apos;s crisis would provide the ideal opportunity to deliver the most profound spiritual wisdom ever given to humanity.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  As Arjuna&apos;s charioteer, Krishna was in the perfect position to guide him. He could have immediately solved Arjuna&apos;s problem with a simple command or divine intervention. But Krishna knew that this moment of crisis was too precious to waste. Instead of giving Arjuna a quick solution, he used this opportunity to reveal the deepest truths about life, duty, spirituality, and the nature of reality itself.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  What followed was not just a conversation, but an 18-chapter dialogue that would become the most sacred text of Hinduism and one of the most influential philosophical works in world history. Krishna would reveal the nature of the eternal soul, the importance of righteous action, the path of devotion, and the ultimate goal of human life.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Through this dialogue, Krishna would transform Arjuna from a confused and despairing warrior into a wise and enlightened being who understood his true purpose. But more importantly, he would give humanity a timeless guide for living a meaningful and spiritual life.
                </p>
              </div>
              <div 
                className="relative h-full rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedImage('/Krishna_divine.jpg')}
              >
                <Image
                  src="/Krishna_divine.jpg"
                  alt="Krishna&apos;s divine form and spiritual presence"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Krishna Divine</h3>
                    <p className="text-sm">The Supreme Lord&apos;s divine presence</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Teachings */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">The Timeless Wisdom That Emerged</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dharma (Duty)</h3>
              <p className="text-gray-600 text-sm">
                The sacred duty that each person must perform according to their nature and position in life, without attachment to success or failure
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Bhakti (Devotion)</h3>
              <p className="text-gray-600 text-sm">
                The path of loving devotion to God, the highest form of spiritual practice that leads to ultimate liberation and divine love
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Jnana (Knowledge)</h3>
              <p className="text-gray-600 text-sm">
                The understanding that the soul is eternal and indestructible, while the body is temporary, leading to wisdom and spiritual enlightenment
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Karma (Action)</h3>
              <p className="text-gray-600 text-sm">
                The science of selfless action performed as an offering to God, free from the bondage of desire and the cycle of cause and effect
              </p>
            </div>
          </div>
        </div>

        {/* The Impact */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">The Eternal Impact on Humanity</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div 
                className="relative h-full rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedImage('/Timeless_wisdom.png')}
              >
                <Image
                  src="/Timeless_wisdom.png"
                  alt="Timeless wisdom of the Bhagavad Gita through the ages"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Timeless Wisdom</h3>
                    <p className="text-sm">Sacred knowledge through the ages</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">A Message That Transcends Time</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Bhagavad Gita&apos;s teachings have transcended the boundaries of time, culture, and religion. For over 5,000 years, its wisdom has guided kings and commoners, philosophers and poets, warriors and saints. Its message has influenced the greatest minds in human history.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Mahatma Gandhi called the Gita his &ldquo;spiritual dictionary&rdquo; and used its teachings to lead India to independence through non-violence. Albert Einstein found in it the answers to the deepest questions about the nature of reality. Countless spiritual masters, from ancient sages to modern teachers, have drawn inspiration from its timeless wisdom.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The story of Arjuna&apos;s crisis and Krishna&apos;s guidance serves as a powerful metaphor for the challenges we all face in life. Each of us, in our own way, experiences moments of doubt, confusion, and moral crisis. We all struggle with the battle between right and wrong, duty and desire, attachment and detachment.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The Gita teaches us that these struggles are not obstacles to be avoided, but opportunities for growth and spiritual evolution. It shows us how to face life&apos;s challenges with wisdom, courage, and devotion, and how to transform our difficulties into stepping stones toward enlightenment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Begin Your Sacred Journey</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Now that you understand the profound story behind the Bhagavad Gita, step into the sacred dialogue between Krishna and Arjuna. Discover the timeless wisdom that has guided humanity for millennia and find answers to life&apos;s deepest questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/chapters"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Explore All Chapters
            </Link>
            <Link 
              href="/famous-verses"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Famous Verses
            </Link>
          </div>
        </div>
      </div>

      {/* Image Modal Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors duration-200 z-10"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Full screen image"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
} 