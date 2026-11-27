#include <algorithm>
#include <cmath>

// State layout: speed (km/h), lateral position (m), steering angle (rad), trailer yaw (rad).
// Called from JavaScript through Emscripten's C ABI.
extern "C" void physics_vehicle_step(
    float* state,
    float dt,
    int throttle,
    int brake,
    float steering_input,
    int lane_assist,
    float target_lane
) {
    if (!state || dt <= 0.0f) return;

    float speed = state[0];
    float x = state[1];
    float steering = state[2];
    float trailer_yaw = state[3];

    if (throttle) {
        speed += 32.0f * dt;
    } else if (brake) {
        speed -= (speed > 2.0f ? 65.0f : 22.0f) * dt;
    } else {
        speed *= std::pow(0.72f, dt);
        if (std::fabs(speed) < 0.2f) speed = 0.0f;
    }
    speed = std::clamp(speed, -30.0f, 145.0f);

    if (std::fabs(steering_input) > 0.01f) {
        steering = steering_input * 0.48f;
    } else if (lane_assist && speed > 5.0f) {
        steering = std::clamp((target_lane - x) * 0.16f, -0.3f, 0.3f);
    } else {
        steering *= std::pow(0.03f, dt);
    }

    const float forward_mps = speed / 3.6f;
    x += std::sin(steering) * forward_mps * 0.74f * dt;
    x = std::clamp(x, -11.3f, 11.3f);
    const float target_trailer_yaw = steering * 0.45f;
    trailer_yaw += (target_trailer_yaw - trailer_yaw) * std::min(1.0f, 5.5f * dt);

    state[0] = speed;
    state[1] = x;
    state[2] = steering;
    state[3] = trailer_yaw;
}
