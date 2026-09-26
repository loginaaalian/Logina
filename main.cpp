#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
#include <limits>

using namespace std;

// =========================
// Player
// =========================
struct Player {
    string name;
    int hp = 100;
    int maxHp = 100;
    int attack = 15;
    int gold = 50;
    int potions = 3;
    int level = 1;
    int xp = 0;
};

// =========================
// Enemy
// =========================
struct Enemy {
    string name;
    int hp;
    int attack;
    int gold;
    int xp;
};

// =========================
// Utility Functions
// =========================
void clearScreen() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void pauseGame() {
    cout << "\nاضغط Enter للمتابعة...";
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
}

int getChoice(int min, int max) {
    int choice;

    while (true) {
        cout << "> ";

        if (cin >> choice && choice >= min && choice <= max) {
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return choice;
        }

        cout << "اختيار غير صحيح، حاول مرة أخرى.\n";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
    }
}

// =========================
// Player Functions
// =========================
void showStats(const Player& player) {
    cout << "\n========== PLAYER ==========\n";
    cout << "الاسم      : " << player.name << "\n";
    cout << "المستوى    : " << player.level << "\n";
    cout << "HP         : " << player.hp << "/" << player.maxHp << "\n";
    cout << "Attack     : " << player.attack << "\n";
    cout << "XP         : " << player.xp << "\n";
    cout << "Gold       : " << player.gold << "\n";
    cout << "Potions    : " << player.potions << "\n";
    cout << "============================\n";
}

void checkLevelUp(Player& player) {
    int neededXP = player.level * 100;

    if (player.xp >= neededXP) {
        player.xp -= neededXP;
        player.level++;

        player.maxHp += 20;
        player.hp = player.maxHp;
        player.attack += 5;

        cout << "\n*** LEVEL UP! ***\n";
        cout << "وصلت للمستوى " << player.level << "!\n";
        cout << "HP زاد إلى " << player.maxHp << "\n";
        cout << "Attack زاد إلى " << player.attack << "\n";
    }
}

void addXP(Player& player, int amount) {
    player.xp += amount;

    cout << "حصلت على " << amount << " XP!\n";

    checkLevelUp(player);
}

void heal(Player& player) {
    if (player.potions <= 0) {
        cout << "ليس لديك Potions!\n";
        return;
    }

    if (player.hp == player.maxHp) {
        cout << "الـ HP ممتلئ بالفعل.\n";
        return;
    }

    player.potions--;

    int healAmount = 30;
    player.hp += healAmount;

    if (player.hp > player.maxHp)
        player.hp = player.maxHp;

    cout << "استخدمت Potion واستعدت صحتك.\n";
    cout << "HP: " << player.hp << "/" << player.maxHp << "\n";
}

// =========================
// Enemy Functions
// =========================
Enemy createGoblin() {
    return {"Goblin", 50, 10, 20, 40};
}

Enemy createWolf() {
    return {"Wolf", 65, 13, 25, 50};
}

Enemy createSkeleton() {
    return {"Skeleton", 80, 16, 30, 65};
}

Enemy createDragon() {
    return {"Ancient Dragon", 250, 25, 500, 300};
}

// =========================
// Combat
// =========================
bool battle(Player& player, Enemy enemy) {
    clearScreen();

    cout << "=================================\n";
    cout << "         BATTLE START!\n";
    cout << "=================================\n";

    cout << "ظهر عدو: " << enemy.name << "\n";
    cout << "Enemy HP: " << enemy.hp << "\n";

    while (player.hp > 0 && enemy.hp > 0) {

        cout << "\n---------------------------------\n";
        cout << player.name << " HP: "
             << player.hp << "/" << player.maxHp << "\n";

        cout << enemy.name << " HP: "
             << enemy.hp << "\n";

        cout << "\n1. Attack\n";
        cout << "2. Use Potion\n";
        cout << "3. Run\n";

        int choice = getChoice(1, 3);

        if (choice == 1) {

            int damage = player.attack + (rand() % 8);

            // Critical hit
            if (rand() % 10 == 0) {
                damage *= 2;
                cout << "\n*** CRITICAL HIT! ***\n";
            }

            enemy.hp -= damage;

            cout << "هاجمت " << enemy.name
                 << " وألحقت " << damage << " damage!\n";

            if (enemy.hp <= 0)
                break;

            // Enemy attacks
            int enemyDamage = enemy.attack + (rand() % 6);

            player.hp -= enemyDamage;

            cout << enemy.name << " هاجمك وألحق "
                 << enemyDamage << " damage!\n";

        } 
        else if (choice == 2) {

            heal(player);

        } 
        else if (choice == 3) {

            // Boss cannot be escaped
            if (enemy.name == "Ancient Dragon") {
                cout << "\nلا يمكنك الهروب من الـ Ancient Dragon!\n";
            } else {

                int chance = rand() % 100;

                if (chance < 50) {
                    cout << "نجحت في الهروب!\n";
                    return true;
                } else {
                    cout << "فشلت في الهروب!\n";

                    int enemyDamage = enemy.attack;
                    player.hp -= enemyDamage;

                    cout << enemy.name
                         << " هاجمك أثناء محاولة الهروب!\n";
                }
            }
        }

        if (player.hp <= 0) {
            cout << "\nلقد خسرت المعركة!\n";
            return false;
        }
    }

    // Enemy defeated
    cout << "\n=================================\n";
    cout << "       ENEMY DEFEATED!\n";
    cout << "=================================\n";

    cout << "هزمت " << enemy.name << "!\n";

    player.gold += enemy.gold;

    cout << "حصلت على " << enemy.gold << " Gold!\n";

    addXP(player, enemy.xp);

    return true;
}

// =========================
// Shop
// =========================
void shop(Player& player) {
    while (true) {

        clearScreen();

        cout << "=================================\n";
        cout << "             SHOP\n";
        cout << "=================================\n";

        cout << "Gold: " << player.gold << "\n\n";

        cout << "1. Potion - 20 Gold\n";
        cout << "2. Upgrade Attack +5 - 80 Gold\n";
        cout << "3. Upgrade Max HP +20 - 80 Gold\n";
        cout << "4. Leave Shop\n";

        int choice = getChoice(1, 4);

        if (choice == 1) {

            if (player.gold >= 20) {
                player.gold -= 20;
                player.potions++;

                cout << "اشتريت Potion!\n";
            } else {
                cout << "ليس لديك Gold كافي.\n";
            }

        } 
        else if (choice == 2) {

            if (player.gold >= 80) {
                player.gold -= 80;
                player.attack += 5;

                cout << "Attack زاد +5!\n";
            } else {
                cout << "ليس لديك Gold كافي.\n";
            }

        } 
        else if (choice == 3) {

            if (player.gold >= 80) {
                player.gold -= 80;

                player.maxHp += 20;
                player.hp += 20;

                cout << "Max HP زاد +20!\n";
            } else {
                cout << "ليس لديك Gold كافي.\n";
            }

        } 
        else {
            break;
        }

        pauseGame();
    }
}

// =========================
// Forest
// =========================
void forest(Player& player) {

    clearScreen();

    cout << "=================================\n";
    cout << "            FOREST\n";
    cout << "=================================\n";

    cout << "دخلت الغابة المظلمة...\n";
    cout << "الأشجار عالية والجو غريب.\n\n";

    int event = rand() % 3;

    if (event == 0) {

        cout << "فجأة ظهر Goblin!\n";

        battle(player, createGoblin());

    } 
    else if (event == 1) {

        cout << "سمعت صوت ذئب...\n";
        cout << "ظهر Wolf!\n";

        battle(player, createWolf());

    } 
    else {

        cout << "وجدت صندوقًا قديمًا!\n";

        int goldFound = 30 + rand() % 51;

        player.gold += goldFound;

        cout << "وجدت " << goldFound << " Gold!\n";

        if (rand() % 2 == 0) {
            player.potions++;
            cout << "ووجدت Potion أيضًا!\n";
        }
    }

    pauseGame();
}

// =========================
// Cave
// =========================
void cave(Player& player) {

    clearScreen();

    cout << "=================================\n";
    cout << "             CAVE\n";
    cout << "=================================\n";

    cout << "دخلت الكهف...\n";
    cout << "الظلام شديد جدًا.\n\n";

    int event = rand() % 3;

    if (event == 0) {

        cout << "Skeleton ظهر من الظلام!\n";

        battle(player, createSkeleton());

    } 
    else if (event == 1) {

        cout << "وجدت كنزًا مخفيًا!\n";

        int goldFound = 50 + rand() % 101;

        player.gold += goldFound;

        cout << "حصلت على " << goldFound << " Gold!\n";

    } 
    else {

        cout << "وجدت Potion على الأرض.\n";

        player.potions++;

        cout << "أخذت Potion.\n";
    }

    pauseGame();
}

// =========================
// Village
// =========================
void village(Player& player) {

    while (true) {

        clearScreen();

        cout << "=================================\n";
        cout << "            VILLAGE\n";
        cout << "=================================\n";

        cout << "أنت الآن في القرية.\n\n";

        cout << "1. Shop\n";
        cout << "2. Rest - 15 Gold\n";
        cout << "3. Leave Village\n";

        int choice = getChoice(1, 3);

        if (choice == 1) {

            shop(player);

        } 
        else if (choice == 2) {

            if (player.gold >= 15) {

                player.gold -= 15;
                player.hp = player.maxHp;

                cout << "استرحت واستعدت كامل HP.\n";

            } else {

                cout << "ليس لديك Gold كافي.\n";
            }

            pauseGame();

        } 
        else {

            break;
        }
    }
}

// =========================
// Final Boss
// =========================
bool finalBoss(Player& player) {

    clearScreen();

    cout << "============================================\n";
    cout << "          THE FINAL CASTLE\n";
    cout << "============================================\n";

    cout << "\nدخلت القلعة القديمة...\n";
    cout << "تسمع صوتًا ضخمًا من الداخل.\n\n";

    cout << "\"لقد وصلت أخيرًا... أيها البطل.\"\n\n";

    cout << "الأرض تهتز!\n";
    cout << "ظهر الـ Ancient Dragon!\n\n";

    pauseGame();

    bool result = battle(player, createDragon());

    if (!result)
        return false;

    clearScreen();

    cout << "============================================\n";
    cout << "              YOU WON!\n";
    cout << "============================================\n";

    cout << "\nهزمت الـ Ancient Dragon!\n";
    cout << "أنقذت المملكة من الشر!\n";
    cout << "كل الناس سيذكرون اسمك كبطل!\n\n";

    cout << "          CONGRATULATIONS, "
         << player.name << "!\n\n";

    return true;
}

// =========================
// Main Game Loop
// =========================
void gameLoop(Player& player) {

    bool gameRunning = true;

    while (gameRunning) {

        clearScreen();

        cout << "============================================\n";
        cout << "             ADVENTURE GAME\n";
        cout << "============================================\n";

        cout << "\nPlayer: " << player.name << "\n";
        cout << "HP: " << player.hp << "/" << player.maxHp << "\n";
        cout << "Gold: " << player.gold << "\n";
        cout << "Level: " << player.level << "\n";

        cout << "\nWhere do you want to go?\n\n";

        cout << "1. Forest\n";
        cout << "2. Cave\n";
        cout << "3. Village\n";
        cout << "4. Final Castle\n";
        cout << "5. Player Stats\n";
        cout << "6. Quit Game\n";

        int choice = getChoice(1, 6);

        switch (choice) {

            case 1:
                forest(player);
                break;

            case 2:
                cave(player);
                break;

            case 3:
                village(player);
                break;

            case 4: {

                if (player.level < 3) {

                    cout << "\nأنت تحتاج على الأقل Level 3 لدخول القلعة!\n";
                    pauseGame();

                } else {

                    bool won = finalBoss(player);

                    if (won) {
                        gameRunning = false;
                    } else {
                        cout << "\nGAME OVER!\n";
                        gameRunning = false;
                    }

                    pauseGame();
                }

                break;
            }

            case 5:
                clearScreen();
                showStats(player);
                pauseGame();
                break;

            case 6:
                cout << "\nشكرًا للعب!\n";
                gameRunning = false;
                break;
        }
    }
}

// =========================
// Main
// =========================
int main() {

    srand(static_cast<unsigned int>(time(nullptr)));

    Player player;

    clearScreen();

    cout << "============================================\n";
    cout << "          WELCOME TO THE ADVENTURE\n";
    cout << "============================================\n\n";

    cout << "اكتب اسم شخصيتك: ";
    getline(cin, player.name);

    if (player.name.empty())
        player.name = "Hero";

    clearScreen();

    cout << "مرحبًا يا " << player.name << "!\n\n";

    cout << "أنت آخر محارب في المملكة.\n";
    cout << "ظهر تنين قديم وبدأ في تدمير الأراضي.\n";
    cout << "مهمتك هي تطوير شخصيتك والوصول إلى القلعة\n";
    cout << "وهزيمة الـ Ancient Dragon.\n\n";

    cout << "ابدأ رحلتك الآن!\n";

    pauseGame();

    gameLoop(player);

    return 0;
}