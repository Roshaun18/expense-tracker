import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { colors, typography, spacing } from "../../theme";
import { View, StyleSheet, Text } from "react-native";

type DonutChartProps = {
  data: {
    title: string,
    value: number;
    startColor: string;
    endColor: string;
  }[];
  centerTitle: string;
  centerValue: string;
};

export default function DonutChart({data,centerTitle,
  centerValue,}: DonutChartProps) {
  const size = 220;
  const strokeWidth = 32;

  const radius = (size - strokeWidth) / 2;
  const total = data.reduce(
  (sum, item) => sum + item.value,
  0
);
const center = size / 2;
const GAP_ANGLE = 3;

let startAngle = 0;

const paths = data.map((item) => {
  const percentage = item.value / total;

  const sweepAngle = percentage * 360;

  const adjustedSweep = Math.max(
    sweepAngle - GAP_ANGLE,
    0
  );

  const path = describeArc(
    center,
    center,
    radius,
    startAngle,
    startAngle + adjustedSweep
  );

  startAngle += sweepAngle;

  return {
    path,
    startColor: item.startColor,

    endColor: item.endColor,
  };
});

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
) {
  const angleInRadians =
    ((angle - 90) * Math.PI) / 180;

  return {
    x:
      centerX +
      radius * Math.cos(angleInRadians),

    y:
      centerY +
      radius * Math.sin(angleInRadians),
  };
}  

function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(
    centerX,
    centerY,
    radius,
    endAngle
  );

  const end = polarToCartesian(
    centerX,
    centerY,
    radius,
    startAngle
  );

  const largeArcFlag =
    endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,

    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

return (
    <View style={styles.container}>
      <Svg width={size} height={size}>

        <Defs>
  {paths.map((item, index) => (
    <LinearGradient
      key={index}
      id={`gradient-${index}`}
      x1="0%"
      y1="0%"
      x2="100%"
      y2="100%"
    >
      <Stop
        offset="0%"
        stopColor={item.startColor}
      />

      <Stop
        offset="100%"
        stopColor={item.endColor}
      />
    </LinearGradient>
  ))}
</Defs>

        {/* Background Ring */}

        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Ring */}

        {paths.map((item, index) => (
  <Path
    key={index}
    d={item.path}
    stroke={`url(#gradient-${index})`}
    strokeWidth={strokeWidth}
    fill="none"
    strokeLinecap="round"
  />
))}

      </Svg>
      <View style={styles.centerContent}>
  <Text style={styles.centerValue}>
    {centerValue}
  </Text>

  <Text style={styles.centerTitle}>
    {centerTitle}
  </Text>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  centerContent: {
  position: "absolute",

  alignItems: "center",
  justifyContent: "center",
},

centerValue: {
  color: colors.textPrimary,

  fontSize: typography.size.xxxl,

  fontWeight: typography.weight.bold,
},

centerTitle: {
  marginTop: spacing.s,

  color: colors.textSecondary,

  fontSize: typography.size.sm,

  fontWeight: typography.weight.medium,
},
});