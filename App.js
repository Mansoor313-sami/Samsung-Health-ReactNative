import React, {
  useState,
  useEffect,
  useMemo,
  memo,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const Tab =
  createBottomTabNavigator();

/* =========================
   STABLE TIMER COMPONENT
========================== */

const TimerDisplay = memo(
  ({ seconds, theme }) => {
    const hrs = Math.floor(
      seconds / 3600
    );

    const mins = Math.floor(
      (seconds % 3600) / 60
    );

    const secs =
      seconds % 60;

    const formatted =
      [hrs, mins, secs]
        .map((v) =>
          v
            .toString()
            .padStart(2, "0")
        )
        .join(":");

    return (
      <Text
        style={[
          styles.timerText,
          {
            color: theme.text,
          },
        ]}
      >
        {formatted}
      </Text>
    );
  }
);

export default function App() {
  /* =========================
     THEME
  ========================== */

  const [darkMode, setDarkMode] =
    useState(true);

  /* =========================
     PROFILE
  ========================== */

  const [userName, setUserName] =
    useState("MANSOOR AHMAD");

  const [tempName, setTempName] =
    useState("");

  const [editModalVisible,
    setEditModalVisible] =
    useState(false);

  /* =========================
     GOALS
  ========================== */

  const [stepsGoal,
    setStepsGoal] =
    useState(2000);

  const [waterGoal,
    setWaterGoal] =
    useState(3000);

  const [calorieGoal,
    setCalorieGoal] =
    useState(2000);

  const [sleepGoal,
    setSleepGoal] =
    useState(8);

  /* =========================
     LIVE HEALTH DATA
  ========================== */

  const [steps, setSteps] =
    useState(3785);

  const [water, setWater] =
    useState(1000);

  const [foodCalories,
    setFoodCalories] =
    useState(1250);

  const [sleepHours,
    setSleepHours] =
    useState(6.5);

  /* =========================
     WORKOUT
  ========================== */

  const [workoutRunning,
    setWorkoutRunning] =
    useState(false);

  const [workoutSeconds,
    setWorkoutSeconds] =
    useState(0);

  /* =========================
     STABLE TIMER
  ========================== */

  useEffect(() => {
    let interval;

    if (workoutRunning) {
      interval = setInterval(() => {
        setWorkoutSeconds(
          (prev) => prev + 1
        );
      }, 1000);
    }

    return () =>
      clearInterval(interval);
  }, [workoutRunning]);

  /* =========================
     THEME COLORS
  ========================== */

  const theme = useMemo(() => {
    return darkMode
      ? {
          background: "#000",
          card: "#151515",
          text: "#fff",
          subText: "#9e9e9e",
          green: "#00d26a",
          border: "#1f1f1f",
        }
      : {
          background: "#f2f2f2",
          card: "#fff",
          text: "#111",
          subText: "#666",
          green: "#00b85c",
          border: "#ddd",
        };
  }, [darkMode]);

  /* =========================
     PROGRESS
  ========================== */

  const stepProgress =
    Math.min(
      (steps / stepsGoal) * 100,
      100
    );

  const waterProgress =
    Math.min(
      (water / waterGoal) * 100,
      100
    );

  const calorieProgress =
    Math.min(
      (foodCalories /
        calorieGoal) *
        100,
      100
    );

  const sleepProgress =
    Math.min(
      (sleepHours /
        sleepGoal) *
        100,
      100
    );
      /* =========================
     HOME SCREEN
  ========================== */

  function HomeScreen() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              theme.background,
          },
        ]}
      >
        <StatusBar
          barStyle={
            darkMode
              ? "light-content"
              : "dark-content"
          }
        />

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          removeClippedSubviews={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          {/* HEADER */}

          <View
            style={
              styles.header
            }
          >
            <Text
              style={[
                styles.title,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Samsung Health
            </Text>

            <Text
              style={[
                styles.syncText,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Last synced just now
            </Text>
          </View>

          {/* DARK MODE */}

          <View
            style={[
              styles.modeCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.modeText,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Dark Mode
            </Text>

            <Switch
              value={
                darkMode
              }
              onValueChange={() =>
                setDarkMode(
                  !darkMode
                )
              }
            />
          </View>

          {/* STEPS */}

          <View
            style={
              styles.stepsCard
            }
          >
            <View
              style={
                styles.rowBetween
              }
            >
              <View>
                <Text
                  style={
                    styles.stepNumber
                  }
                >
                  {steps.toLocaleString()}
                </Text>

                <Text
                  style={
                    styles.stepGoal
                  }
                >
                  /{" "}
                  {stepsGoal.toLocaleString()}{" "}
                  steps
                </Text>
              </View>

              <View
                style={
                  styles.percentBadge
                }
              >
                <Text
                  style={
                    styles.percentText
                  }
                >
                  {Math.floor(
                    (steps /
                      stepsGoal) *
                      100
                  )}
                  %
                </Text>
              </View>
            </View>

            {/* PROGRESS */}

            <View
              style={
                styles.progressBackground
              }
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${stepProgress}%`,
                  },
                ]}
              />
            </View>

            {/* BUTTONS */}

            <View
              style={
                styles.actionRow
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.greenBtn
                }
                onPress={() =>
                  setSteps(
                    (prev) =>
                      prev + 500
                  )
                }
              >
                <Text
                  style={
                    styles.greenBtnText
                  }
                >
                  +500
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.greenBtn
                }
                onPress={() =>
                  setSteps(0)
                }
              >
                <Text
                  style={
                    styles.greenBtnText
                  }
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* QUICK STATS */}

          <View
            style={[
              styles.statsCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.statRow
              }
            >
              <Ionicons
                name="walk"
                size={24}
                color="#00ff88"
              />

              <Text
                style={[
                  styles.statText,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {steps} total
                steps
              </Text>
            </View>

            <View
              style={
                styles.statRow
              }
            >
              <Ionicons
                name="flame"
                size={24}
                color="#ff7043"
              />

              <Text
                style={[
                  styles.statText,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {foodCalories}{" "}
                calories
              </Text>
            </View>

            <View
              style={
                styles.statRow
              }
            >
              <Ionicons
                name="water"
                size={24}
                color="#4da6ff"
              />

              <Text
                style={[
                  styles.statText,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {water} ml
                water
              </Text>
            </View>
          </View>

          {/* WATER */}

          <View
            style={[
              styles.healthCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.rowBetween
              }
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Water
              </Text>

              <Text
                style={[
                  styles.goalText,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                Goal:{" "}
                {
                  waterGoal
                }{" "}
                ml
              </Text>
            </View>

            <Text
              style={[
                styles.bigValue,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {water} ml
            </Text>

            <View
              style={
                styles.progressBackgroundDark
              }
            >
              <View
                style={[
                  styles.blueFill,
                  {
                    width: `${waterProgress}%`,
                  },
                ]}
              />
            </View>

            <View
              style={
                styles.actionRow
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.darkBtn
                }
                onPress={() =>
                  setWater(
                    (prev) =>
                      prev + 250
                  )
                }
              >
                <Text
                  style={
                    styles.darkBtnText
                  }
                >
                  +250 ml
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.darkBtn
                }
                onPress={() =>
                  setWater(0)
                }
              >
                <Text
                  style={
                    styles.darkBtnText
                  }
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOD */}

          <View
            style={[
              styles.healthCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.rowBetween
              }
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Food
              </Text>

              <Text
                style={[
                  styles.goalText,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                Goal:{" "}
                {
                  calorieGoal
                }{" "}
                kcal
              </Text>
            </View>

            <Text
              style={[
                styles.bigValue,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {foodCalories}{" "}
              kcal
            </Text>

            <View
              style={
                styles.progressBackgroundDark
              }
            >
              <View
                style={[
                  styles.orangeFill,
                  {
                    width: `${calorieProgress}%`,
                  },
                ]}
              />
            </View>

            <View
              style={
                styles.actionRow
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.darkBtn
                }
                onPress={() =>
                  setFoodCalories(
                    (prev) =>
                      prev + 200
                  )
                }
              >
                <Text
                  style={
                    styles.darkBtnText
                  }
                >
                  +200 kcal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.darkBtn
                }
                onPress={() =>
                  setFoodCalories(
                    0
                  )
                }
              >
                <Text
                  style={
                    styles.darkBtnText
                  }
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SLEEP */}

          <View
            style={[
              styles.healthCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.rowBetween
              }
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Sleep
              </Text>

              <Text
                style={[
                  styles.goalText,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                Goal:{" "}
                {
                  sleepGoal
                }{" "}
                hrs
              </Text>
            </View>

            <Text
              style={[
                styles.bigValue,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {sleepHours} hrs
            </Text>

            <View
              style={
                styles.progressBackgroundDark
              }
            >
              <View
                style={[
                  styles.purpleFill,
                  {
                    width: `${sleepProgress}%`,
                  },
                ]}
              />
            </View>

            <View
              style={
                styles.actionRow
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.darkBtn
                }
                onPress={() =>
                  setSleepHours(
                    (prev) =>
                      Number(
                        (
                          prev +
                          0.5
                        ).toFixed(
                          1
                        )
                      )
                  )
                }
              >
                <Text
                  style={
                    styles.darkBtnText
                  }
                >
                  +30 mins
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.darkBtn
                }
                onPress={() =>
                  setSleepHours(
                    0
                  )
                }
              >
                <Text
                  style={
                    styles.darkBtnText
                  }
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* WORKOUT */}

          <View
            style={[
              styles.healthCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.cardTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Workout
            </Text>

            {/* STABLE TIMER */}

            <TimerDisplay
              seconds={
                workoutSeconds
              }
              theme={theme}
            />

            <View
              style={
                styles.actionRow
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.darkBtn
                }
                onPress={() =>
                  setWorkoutRunning(
                    !workoutRunning
                  )
                }
              >
                <Text
                  style={
                    styles.darkBtnText
                  }
                >
                  {workoutRunning
                    ? "Pause"
                    : "Start"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                style={
                  styles.darkBtn
                }
                onPress={() => {
                  setWorkoutRunning(
                    false
                  );

                  setWorkoutSeconds(
                    0
                  );
                }}
              >
                <Text
                  style={
                    styles.darkBtnText
                  }
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
    /* =========================
     FITNESS SCREEN
  ========================== */

  function FitnessScreen() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              theme.background,
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          removeClippedSubviews={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          {/* HEADER */}

          <View
            style={
              styles.screenHeader
            }
          >
            <Text
              style={[
                styles.screenTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Fitness
            </Text>

            <Text
              style={[
                styles.screenSubTitle,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Activities & workouts
            </Text>
          </View>

          {/* QUICK ACTIONS */}

          <View
            style={
              styles.quickActionsRow
            }
          >
            {/* WALK */}

            <TouchableOpacity
              activeOpacity={
                0.85
              }
              style={[
                styles.quickCard,
                {
                  backgroundColor:
                    theme.card,
                },
              ]}
              onPress={() => {
                setWorkoutRunning(
                  true
                );

                setSteps(
                  (prev) =>
                    prev + 1000
                );
              }}
            >
              <Ionicons
                name="walk"
                size={40}
                color="#00ff88"
              />

              <Text
                style={[
                  styles.quickCardText,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Walking
              </Text>
            </TouchableOpacity>

            {/* RUN */}

            <TouchableOpacity
              activeOpacity={
                0.85
              }
              style={[
                styles.quickCard,
                {
                  backgroundColor:
                    theme.card,
                },
              ]}
              onPress={() => {
                setWorkoutRunning(
                  true
                );

                setSteps(
                  (prev) =>
                    prev + 2000
                );

                setFoodCalories(
                  (prev) =>
                    prev - 100
                );
              }}
            >
              <MaterialIcons
                name="directions-run"
                size={40}
                color="#ff9800"
              />

              <Text
                style={[
                  styles.quickCardText,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Running
              </Text>
            </TouchableOpacity>
          </View>

          {/* SECOND ROW */}

          <View
            style={
              styles.quickActionsRow
            }
          >
            {/* CYCLING */}

            <TouchableOpacity
              activeOpacity={
                0.85
              }
              style={[
                styles.quickCard,
                {
                  backgroundColor:
                    theme.card,
                },
              ]}
              onPress={() => {
                setWorkoutRunning(
                  true
                );

                setSteps(
                  (prev) =>
                    prev + 3000
                );
              }}
            >
              <FontAwesome5
                name="bicycle"
                size={34}
                color="#4da6ff"
              />

              <Text
                style={[
                  styles.quickCardText,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Cycling
              </Text>
            </TouchableOpacity>

            {/* WORKOUT */}

            <TouchableOpacity
              activeOpacity={
                0.85
              }
              style={[
                styles.quickCard,
                {
                  backgroundColor:
                    theme.card,
                },
              ]}
              onPress={() => {
                setWorkoutRunning(
                  true
                );

                setSteps(
                  (prev) =>
                    prev + 4000
                );

                setFoodCalories(
                  (prev) =>
                    prev - 200
                );
              }}
            >
              <Ionicons
                name="fitness"
                size={38}
                color="#ff4da6"
              />

              <Text
                style={[
                  styles.quickCardText,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Workout
              </Text>
            </TouchableOpacity>
          </View>

          {/* LIVE WORKOUT */}

          <View
            style={[
              styles.largeCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.cardTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Live Workout
            </Text>

            {/* STABLE TIMER */}

            <TimerDisplay
              seconds={
                workoutSeconds
              }
              theme={theme}
            />

            <View
              style={
                styles.liveWorkoutButtons
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.liveBtn
                }
                onPress={() =>
                  setWorkoutRunning(
                    !workoutRunning
                  )
                }
              >
                <Text
                  style={
                    styles.liveBtnText
                  }
                >
                  {workoutRunning
                    ? "Pause"
                    : "Start"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.liveBtn
                }
                onPress={() => {
                  setWorkoutRunning(
                    false
                  );

                  setWorkoutSeconds(
                    0
                  );
                }}
              >
                <Text
                  style={
                    styles.liveBtnText
                  }
                >
                  Stop
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* DAILY REPORT */}

          <View
            style={[
              styles.largeCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.cardTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Daily Report
            </Text>

            {/* STEP */}

            <View
              style={
                styles.reportItem
              }
            >
              <View
                style={
                  styles.reportLeft
                }
              >
                <Ionicons
                  name="walk"
                  size={24}
                  color="#00ff88"
                />

                <Text
                  style={[
                    styles.reportLabel,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Steps
                </Text>
              </View>

              <Text
                style={[
                  styles.reportValue,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {steps}
              </Text>
            </View>

            {/* WATER */}

            <View
              style={
                styles.reportItem
              }
            >
              <View
                style={
                  styles.reportLeft
                }
              >
                <Ionicons
                  name="water"
                  size={24}
                  color="#4da6ff"
                />

                <Text
                  style={[
                    styles.reportLabel,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Water
                </Text>
              </View>

              <Text
                style={[
                  styles.reportValue,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {water} ml
              </Text>
            </View>

            {/* CALORIES */}

            <View
              style={
                styles.reportItem
              }
            >
              <View
                style={
                  styles.reportLeft
                }
              >
                <Ionicons
                  name="flame"
                  size={24}
                  color="#ff7043"
                />

                <Text
                  style={[
                    styles.reportLabel,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Calories
                </Text>
              </View>

              <Text
                style={[
                  styles.reportValue,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {foodCalories}
              </Text>
            </View>

            {/* SLEEP */}

            <View
              style={
                styles.reportItem
              }
            >
              <View
                style={
                  styles.reportLeft
                }
              >
                <Ionicons
                  name="moon"
                  size={24}
                  color="#b266ff"
                />

                <Text
                  style={[
                    styles.reportLabel,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Sleep
                </Text>
              </View>

              <Text
                style={[
                  styles.reportValue,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {sleepHours} hrs
              </Text>
            </View>
          </View>

          {/* ACHIEVEMENTS */}

          <View
            style={[
              styles.largeCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.cardTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Achievements
            </Text>

            <View
              style={
                styles.achievementRow
              }
            >
              <View
                style={
                  styles.achievementCard
                }
              >
                <Ionicons
                  name="trophy"
                  size={42}
                  color="#ffd700"
                />

                <Text
                  style={
                    styles.achievementTitle
                  }
                >
                  Walker
                </Text>
              </View>

              <View
                style={
                  styles.achievementCard
                }
              >
                <Ionicons
                  name="water"
                  size={42}
                  color="#4da6ff"
                />

                <Text
                  style={
                    styles.achievementTitle
                  }
                >
                  Hydrated
                </Text>
              </View>

              <View
                style={
                  styles.achievementCard
                }
              >
                <Ionicons
                  name="fitness"
                  size={42}
                  color="#ff4da6"
                />

                <Text
                  style={
                    styles.achievementTitle
                  }
                >
                  Athlete
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
    /* =========================
     SETTINGS SCREEN
  ========================== */

  function SettingsScreen() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              theme.background,
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          removeClippedSubviews={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          {/* HEADER */}

          <View
            style={
              styles.screenHeader
            }
          >
            <Text
              style={[
                styles.screenTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Settings
            </Text>

            <Text
              style={[
                styles.screenSubTitle,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Customize your goals
            </Text>
          </View>

          {/* STEPS GOAL */}

          <View
            style={[
              styles.settingsCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.settingsTop
              }
            >
              <Text
                style={[
                  styles.settingsTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Daily Steps Goal
              </Text>

              <Ionicons
                name="walk"
                size={28}
                color="#00ff88"
              />
            </View>

            <Text
              style={[
                styles.settingsValue,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {stepsGoal}
            </Text>

            <View
              style={
                styles.settingsButtons
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.settingsBtn
                }
                onPress={() =>
                  setStepsGoal(
                    (prev) =>
                      prev + 500
                  )
                }
              >
                <Text
                  style={
                    styles.settingsBtnText
                  }
                >
                  +500
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.settingsBtn
                }
                onPress={() =>
                  setStepsGoal(
                    Math.max(
                      500,
                      stepsGoal -
                        500
                    )
                  )
                }
              >
                <Text
                  style={
                    styles.settingsBtnText
                  }
                >
                  -500
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* WATER GOAL */}

          <View
            style={[
              styles.settingsCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.settingsTop
              }
            >
              <Text
                style={[
                  styles.settingsTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Water Goal
              </Text>

              <Ionicons
                name="water"
                size={28}
                color="#4da6ff"
              />
            </View>

            <Text
              style={[
                styles.settingsValue,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {waterGoal} ml
            </Text>

            <View
              style={
                styles.settingsButtons
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.settingsBtn
                }
                onPress={() =>
                  setWaterGoal(
                    (prev) =>
                      prev + 250
                  )
                }
              >
                <Text
                  style={
                    styles.settingsBtnText
                  }
                >
                  +250
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.settingsBtn
                }
                onPress={() =>
                  setWaterGoal(
                    Math.max(
                      250,
                      waterGoal -
                        250
                    )
                  )
                }
              >
                <Text
                  style={
                    styles.settingsBtnText
                  }
                >
                  -250
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* CALORIE GOAL */}

          <View
            style={[
              styles.settingsCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.settingsTop
              }
            >
              <Text
                style={[
                  styles.settingsTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Calories Goal
              </Text>

              <Ionicons
                name="flame"
                size={28}
                color="#ff7043"
              />
            </View>

            <Text
              style={[
                styles.settingsValue,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {calorieGoal} kcal
            </Text>

            <View
              style={
                styles.settingsButtons
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.settingsBtn
                }
                onPress={() =>
                  setCalorieGoal(
                    (prev) =>
                      prev + 100
                  )
                }
              >
                <Text
                  style={
                    styles.settingsBtnText
                  }
                >
                  +100
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.settingsBtn
                }
                onPress={() =>
                  setCalorieGoal(
                    Math.max(
                      500,
                      calorieGoal -
                        100
                    )
                  )
                }
              >
                <Text
                  style={
                    styles.settingsBtnText
                  }
                >
                  -100
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SLEEP GOAL */}

          <View
            style={[
              styles.settingsCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.settingsTop
              }
            >
              <Text
                style={[
                  styles.settingsTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Sleep Goal
              </Text>

              <Ionicons
                name="moon"
                size={28}
                color="#b266ff"
              />
            </View>

            <Text
              style={[
                styles.settingsValue,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {sleepGoal} hrs
            </Text>

            <View
              style={
                styles.settingsButtons
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.settingsBtn
                }
                onPress={() =>
                  setSleepGoal(
                    (prev) =>
                      prev + 1
                  )
                }
              >
                <Text
                  style={
                    styles.settingsBtnText
                  }
                >
                  +1
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.settingsBtn
                }
                onPress={() =>
                  setSleepGoal(
                    Math.max(
                      1,
                      sleepGoal -
                        1
                    )
                  )
                }
              >
                <Text
                  style={
                    styles.settingsBtnText
                  }
                >
                  -1
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* DARK MODE */}

          <View
            style={[
              styles.settingsCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <View
              style={
                styles.rowBetween
              }
            >
              <View>
                <Text
                  style={[
                    styles.settingsTitle,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Dark Mode
                </Text>

                <Text
                  style={[
                    styles.modeDescription,
                    {
                      color:
                        theme.subText,
                    },
                  ]}
                >
                  Toggle appearance
                </Text>
              </View>

              <Switch
                value={
                  darkMode
                }
                onValueChange={() =>
                  setDarkMode(
                    !darkMode
                  )
                }
              />
            </View>
          </View>

          {/* RESET BUTTON */}

          <TouchableOpacity
            activeOpacity={
              0.85
            }
            style={
              styles.resetButton
            }
            onPress={() => {
              setSteps(0);
              setWater(0);
              setFoodCalories(0);
              setSleepHours(0);
              setWorkoutSeconds(0);

              Alert.alert(
                "Reset Complete",
                "All health data reset successfully."
              );
            }}
          >
            <Text
              style={
                styles.resetButtonText
              }
            >
              Reset All Data
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
    /* =========================
     MY PAGE SCREEN
  ========================== */

  function MyPageScreen() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              theme.background,
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          removeClippedSubviews={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          {/* HEADER */}

          <View
            style={
              styles.screenHeader
            }
          >
            <Text
              style={[
                styles.screenTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              My Page
            </Text>

            <Text
              style={[
                styles.screenSubTitle,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Personal health profile
            </Text>
          </View>

          {/* PROFILE CARD */}

          <View
            style={[
              styles.profileCard,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            {/* EDIT BUTTON */}

            <TouchableOpacity
              activeOpacity={
                0.85
              }
              style={
                styles.editButton
              }
              onPress={() => {
                setTempName(
                  userName
                );

                setEditModalVisible(
                  true
                );
              }}
            >
              <Ionicons
                name="create-outline"
                size={22}
                color="white"
              />
            </TouchableOpacity>

            {/* AVATAR */}

            <View
              style={
                styles.avatar
              }
            >
              <Ionicons
                name="person"
                size={72}
                color="white"
              />
            </View>

            {/* NAME */}

            <Text
              style={[
                styles.profileName,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {userName}
            </Text>

            <Text
              style={[
                styles.profileLevel,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Expert Level 30
            </Text>

            {/* XP */}

            <View
              style={
                styles.xpContainer
              }
            >
              <View
                style={
                  styles.xpFill
                }
              />
            </View>

            <Text
              style={[
                styles.xpText,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              70 / 3150 XP
            </Text>

            {/* BUTTONS */}

            <View
              style={
                styles.profileButtonRow
              }
            >
              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.profileBtn
                }
                onPress={() =>
                  Alert.alert(
                    "Friends",
                    "27 connected friends."
                  )
                }
              >
                <Text
                  style={
                    styles.profileBtnText
                  }
                >
                  Friends
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={
                  styles.profileBtn
                }
                onPress={() =>
                  Alert.alert(
                    "QR Code",
                    "QR feature available."
                  )
                }
              >
                <Text
                  style={
                    styles.profileBtnText
                  }
                >
                  QR Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* WEEKLY REPORT */}

          <View
            style={[
              styles.profileSection,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.profileSectionTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Weekly Report
            </Text>

            <View
              style={
                styles.weeklyRow
              }
            >
              <View>
                <Text
                  style={[
                    styles.weekLabel,
                    {
                      color:
                        theme.subText,
                    },
                  ]}
                >
                  Avg Steps
                </Text>

                <Text
                  style={[
                    styles.weekValue,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  {Math.floor(
                    steps / 7
                  )}
                </Text>
              </View>

              <View>
                <Text
                  style={[
                    styles.weekLabel,
                    {
                      color:
                        theme.subText,
                    },
                  ]}
                >
                  Water
                </Text>

                <Text
                  style={[
                    styles.weekValue,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  {water} ml
                </Text>
              </View>
            </View>
          </View>

          {/* ACHIEVEMENTS */}

          <View
            style={[
              styles.profileSection,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.profileSectionTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Achievements
            </Text>

            <View
              style={
                styles.achievementGrid
              }
            >
              {/* WALKER */}

              <View
                style={
                  styles.achievementItem
                }
              >
                <View
                  style={
                    styles.achievementIcon
                  }
                >
                  <Ionicons
                    name="walk"
                    size={38}
                    color="#00ff88"
                  />
                </View>

                <Text
                  style={[
                    styles.achievementName,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Walker
                </Text>
              </View>

              {/* WATER */}

              <View
                style={
                  styles.achievementItem
                }
              >
                <View
                  style={
                    styles.achievementIcon
                  }
                >
                  <Ionicons
                    name="water"
                    size={38}
                    color="#4da6ff"
                  />
                </View>

                <Text
                  style={[
                    styles.achievementName,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Hydrated
                </Text>
              </View>

              {/* FITNESS */}

              <View
                style={
                  styles.achievementItem
                }
              >
                <View
                  style={
                    styles.achievementIcon
                  }
                >
                  <Ionicons
                    name="fitness"
                    size={38}
                    color="#ff4da6"
                  />
                </View>

                <Text
                  style={[
                    styles.achievementName,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Athlete
                </Text>
              </View>
            </View>
          </View>

          {/* PERSONAL STATS */}

          <View
            style={[
              styles.profileSection,
              {
                backgroundColor:
                  theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.profileSectionTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Personal Stats
            </Text>

            {/* ROW */}

            <View
              style={
                styles.statsRow
              }
            >
              <Text
                style={[
                  styles.statsLabel,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                Total Steps
              </Text>

              <Text
                style={[
                  styles.statsValue,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {steps}
              </Text>
            </View>

            {/* ROW */}

            <View
              style={
                styles.statsRow
              }
            >
              <Text
                style={[
                  styles.statsLabel,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                Calories
              </Text>

              <Text
                style={[
                  styles.statsValue,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {foodCalories}
              </Text>
            </View>

            {/* ROW */}

            <View
              style={
                styles.statsRow
              }
            >
              <Text
                style={[
                  styles.statsLabel,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                Water Intake
              </Text>

              <Text
                style={[
                  styles.statsValue,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {water} ml
              </Text>
            </View>

            {/* ROW */}

            <View
              style={
                styles.statsRow
              }
            >
              <Text
                style={[
                  styles.statsLabel,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                Sleep
              </Text>

              <Text
                style={[
                  styles.statsValue,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {sleepHours} hrs
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* MODAL */}

        <Modal
          visible={
            editModalVisible
          }
          transparent
          animationType="fade"
        >
          <View
            style={
              styles.modalOverlay
            }
          >
            <View
              style={
                styles.modalCard
              }
            >
              <Text
                style={
                  styles.modalTitle
                }
              >
                Edit Profile
              </Text>

              <TextInput
                value={tempName}
                onChangeText={
                  setTempName
                }
                style={
                  styles.modalInput
                }
                placeholder="Enter Name"
                placeholderTextColor="#888"
              />

              <View
                style={
                  styles.modalButtons
                }
              >
                <TouchableOpacity
                  activeOpacity={
                    0.85
                  }
                  style={
                    styles.modalBtn
                  }
                  onPress={() =>
                    setEditModalVisible(
                      false
                    )
                  }
                >
                  <Text
                    style={
                      styles.modalBtnText
                    }
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={
                    0.85
                  }
                  style={
                    styles.modalBtn
                  }
                  onPress={() => {
                    setUserName(
                      tempName
                    );

                    setEditModalVisible(
                      false
                    );
                  }}
                >
                  <Text
                    style={
                      styles.modalBtnText
                    }
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
    /* =========================
     MAIN APP
  ========================== */

  return (
    <NavigationContainer
      theme={
        darkMode
          ? DarkTheme
          : DefaultTheme
      }
    >
      <Tab.Navigator
        screenOptions={({
          route,
        }) => ({
          headerShown: false,

          lazy: false,

          freezeOnBlur: true,

          tabBarHideOnKeyboard: true,

          tabBarStyle: {
            backgroundColor:
              theme.card,

            borderTopColor:
              theme.border,

            borderTopWidth: 1,

            height: 75,

            paddingTop: 8,

            paddingBottom: 8,
          },

          tabBarActiveTintColor:
            "#00d26a",

          tabBarInactiveTintColor:
            "gray",

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },

          tabBarIcon: ({
            color,
            size,
          }) => {
            let iconName;

            if (
              route.name === "Home"
            ) {
              iconName = "home";
            } else if (
              route.name ===
              "Fitness"
            ) {
              iconName = "fitness";
            } else if (
              route.name ===
              "Settings"
            ) {
              iconName =
                "settings";
            } else if (
              route.name ===
              "My Page"
            ) {
              iconName =
                "person";
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />

        <Tab.Screen
          name="Fitness"
          component={
            FitnessScreen
          }
        />

        <Tab.Screen
          name="Settings"
          component={
            SettingsScreen
          }
        />

        <Tab.Screen
          name="My Page"
          component={
            MyPageScreen
          }
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* =========================
   STYLES
========================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 25,
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
  },

  syncText: {
    marginTop: 5,
    fontSize: 14,
  },

  modeCard: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 15,

    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  modeText: {
    fontSize: 18,
    fontWeight: "600",
  },

  stepsCard: {
    backgroundColor: "#00c853",

    borderRadius: 30,

    padding: 22,

    marginBottom: 15,
  },

  rowBetween: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  stepNumber: {
    color: "white",

    fontSize: 50,

    fontWeight: "bold",
  },

  stepGoal: {
    color: "white",

    marginTop: 5,

    fontSize: 18,
  },

  percentBadge: {
    backgroundColor:
      "#d6ffe6",

    paddingHorizontal: 18,

    paddingVertical: 10,

    borderRadius: 30,
  },

  percentText: {
    color: "#00a651",

    fontWeight: "bold",

    fontSize: 16,
  },

  progressBackground: {
    width: "100%",

    height: 12,

    backgroundColor:
      "#7dffb0",

    borderRadius: 20,

    marginTop: 25,
  },

  progressFill: {
    height: 12,

    backgroundColor:
      "#00ff80",

    borderRadius: 20,
  },

  actionRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 20,
  },

  greenBtn: {
    backgroundColor:
      "#009944",

    paddingHorizontal: 26,

    paddingVertical: 13,

    borderRadius: 30,
  },

  greenBtnText: {
    color: "white",

    fontWeight: "bold",
  },

  statsCard: {
    borderRadius: 30,

    padding: 22,

    marginBottom: 15,
  },

  statRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 18,
  },

  statText: {
    marginLeft: 15,

    fontSize: 18,

    fontWeight: "600",
  },

  healthCard: {
    borderRadius: 30,

    padding: 22,

    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  goalText: {
    fontSize: 14,
  },

  bigValue: {
    fontSize: 40,

    fontWeight: "bold",

    marginTop: 15,
  },

  progressBackgroundDark: {
    width: "100%",

    height: 10,

    backgroundColor:
      "#2d2d2d",

    borderRadius: 20,

    marginTop: 18,
  },

  blueFill: {
    height: 10,

    backgroundColor:
      "#4da6ff",

    borderRadius: 20,
  },

  orangeFill: {
    height: 10,

    backgroundColor:
      "#ff9800",

    borderRadius: 20,
  },

  purpleFill: {
    height: 10,

    backgroundColor:
      "#b266ff",

    borderRadius: 20,
  },

  darkBtn: {
    backgroundColor:
      "#2c2c2c",

    paddingHorizontal: 25,

    paddingVertical: 12,

    borderRadius: 30,
  },

  darkBtnText: {
    color: "white",

    fontWeight: "600",
  },

  timerText: {
    fontSize: 46,

    fontWeight: "bold",

    marginTop: 20,
  },

  screenHeader: {
    marginTop: 25,
    marginBottom: 20,
  },

  screenTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },

  screenSubTitle: {
    marginTop: 6,
    fontSize: 15,
  },

  quickActionsRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginBottom: 15,
  },

  quickCard: {
    width: "48%",

    borderRadius: 30,

    paddingVertical: 32,

    alignItems: "center",
  },

  quickCardText: {
    marginTop: 15,

    fontSize: 18,

    fontWeight: "600",
  },

  largeCard: {
    borderRadius: 30,

    padding: 22,

    marginBottom: 15,
  },

  liveWorkoutButtons: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 25,
  },

  liveBtn: {
    backgroundColor:
      "#2c2c2c",

    paddingHorizontal: 35,

    paddingVertical: 14,

    borderRadius: 30,
  },

  liveBtnText: {
    color: "white",

    fontWeight: "bold",
  },

  reportItem: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginTop: 22,
  },

  reportLeft: {
    flexDirection: "row",

    alignItems: "center",
  },

  reportLabel: {
    marginLeft: 14,

    fontSize: 18,
  },

  reportValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  achievementRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 25,
  },

  achievementCard: {
    alignItems: "center",
  },

  achievementTitle: {
    color: "white",

    marginTop: 10,

    fontWeight: "600",
  },

  settingsCard: {
    borderRadius: 30,

    padding: 22,

    marginBottom: 15,
  },

  settingsTop: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  settingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  settingsValue: {
    fontSize: 38,

    fontWeight: "bold",

    marginTop: 20,
  },

  settingsButtons: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 25,
  },

  settingsBtn: {
    backgroundColor:
      "#2c2c2c",

    paddingHorizontal: 35,

    paddingVertical: 14,

    borderRadius: 30,
  },

  settingsBtnText: {
    color: "white",

    fontWeight: "bold",
  },

  modeDescription: {
    marginTop: 6,
    fontSize: 14,
  },

  resetButton: {
    backgroundColor:
      "#ff3b30",

    paddingVertical: 18,

    borderRadius: 30,

    alignItems: "center",

    marginTop: 10,
  },

  resetButtonText: {
    color: "white",

    fontWeight: "bold",

    fontSize: 16,
  },

  profileCard: {
    borderRadius: 35,

    padding: 24,

    alignItems: "center",

    marginBottom: 15,
  },

  editButton: {
    position: "absolute",

    top: 20,
    right: 20,

    backgroundColor:
      "#2c2c2c",

    width: 46,
    height: 46,

    borderRadius: 23,

    justifyContent:
      "center",

    alignItems: "center",
  },

  avatar: {
    width: 120,
    height: 120,

    borderRadius: 60,

    backgroundColor:
      "#3a3a3a",

    justifyContent:
      "center",

    alignItems: "center",
  },

  profileName: {
    fontSize: 28,
    fontWeight: "bold",

    marginTop: 18,
  },

  profileLevel: {
    marginTop: 5,
  },

  xpContainer: {
    width: "100%",

    height: 12,

    backgroundColor:
      "#333",

    borderRadius: 20,

    marginTop: 20,
  },

  xpFill: {
    width: "45%",

    height: 12,

    backgroundColor:
      "#ffc107",

    borderRadius: 20,
  },

  xpText: {
    marginTop: 10,
  },

  profileButtonRow: {
    flexDirection: "row",

    marginTop: 25,
  },

  profileBtn: {
    backgroundColor:
      "#2c2c2c",

    paddingHorizontal: 28,

    paddingVertical: 14,

    borderRadius: 30,

    marginHorizontal: 8,
  },

  profileBtnText: {
    color: "white",

    fontWeight: "600",
  },

  profileSection: {
    borderRadius: 30,

    padding: 22,

    marginBottom: 15,
  },

  profileSectionTitle: {
    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,
  },

  weeklyRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",
  },

  weekLabel: {
    fontSize: 15,
  },

  weekValue: {
    fontSize: 34,

    fontWeight: "bold",

    marginTop: 10,
  },

  achievementGrid: {
    flexDirection: "row",

    justifyContent:
      "space-between",
  },

  achievementItem: {
    alignItems: "center",
  },

  achievementIcon: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor:
      "#2c2c2c",

    justifyContent:
      "center",

    alignItems: "center",
  },

  achievementName: {
    marginTop: 12,

    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 18,
  },

  statsLabel: {
    fontSize: 17,
  },

  statsValue: {
    fontSize: 18,

    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.6)",

    justifyContent:
      "center",

    alignItems: "center",
  },

  modalCard: {
    width: "85%",

    backgroundColor:
      "#1f1f1f",

    borderRadius: 30,

    padding: 25,
  },

  modalTitle: {
    color: "white",

    fontSize: 26,

    fontWeight: "bold",

    marginBottom: 20,
  },

  modalInput: {
    backgroundColor:
      "#2d2d2d",

    borderRadius: 20,

    paddingHorizontal: 18,

    paddingVertical: 16,

    color: "white",

    fontSize: 18,
  },

  modalButtons: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 25,
  },

  modalBtn: {
    backgroundColor:
      "#2d2d2d",

    paddingHorizontal: 35,

    paddingVertical: 14,

    borderRadius: 25,
  },

  modalBtnText: {
    color: "white",

    fontWeight: "bold",
  },
});