/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { memo, useRef } from "react";
import useMaterialAnimation from "../hooks/useMaterialAnimation";
import useObjectAnimation from "../hooks/useObjectAnimation";

function Model({
  pageState,
  nodes,
  materials,
  depthMaterials,
  meshTransitionProps,
  materialTransitionProps,
  ...props
}) {
  /**
   * Mesh를 직접 조작하기 위해 Ref를 선언합니다.
   */
  const ceilRef = useRef(null);
  const contentMainRef = useRef(null);
  const contentFrontRef = useRef(null);
  const contentBackRef = useRef(null);

  /**
   * 상태에 따른 Animation Props를 선언합니다.
   */
  const {
    ceilHingeProps,
    contentMainProps,
    contentFrontProps,
    contentBackProps,
  } = meshTransitionProps;

  /**
   * Page 상태에 따라 Mesh, Material 애니메이션을 재생합니다.
   */
  useObjectAnimation(ceilRef, pageState, ceilHingeProps);
  useObjectAnimation(contentMainRef, pageState, contentMainProps);
  useObjectAnimation(contentFrontRef, pageState, contentFrontProps);
  useObjectAnimation(contentBackRef, pageState, contentBackProps);

  useMaterialAnimation(materials, pageState, materialTransitionProps);

  /**
   * THREE JS Object 렌더링
   */
  return (
    <group {...props} dispose={null} rotation={[0, Math.PI / 2, 0]}>
      {/* 1. Ceil Card, Backgrounds */}
      {/* Rotation으로 Main 힌지를 조정합니다. Pre: 1, Open: 0, Next: -1 */}
      <group rotation={[0, 0, (-Math.PI * 0) / 2]} ref={ceilRef}>
        <mesh
          geometry={nodes.ceil_01.geometry}
          material={materials.sheet_ceil}
          position={[0.05, 3.3, 0]}
          receiveShadow
        />
        <mesh
          ref={contentBackRef}
          geometry={nodes.back_01.geometry}
          material={materials.content_back}
          customDepthMaterial={depthMaterials.content_back}
          // PositionX가 보여지는 경우 -0.2, 비활성인 경우 -0.02로 변경되어야 합니다.
          position={[-0.02, 4.61, 0]}
          scale={[1, 0.67, 1.09]}
          castShadow
          receiveShadow
        />
      </group>

      {/* 2. Floor Card and Hinged items */}
      {/* Rotation으로 Main 힌지를 조절합니다.
      Close: 0 | Open: Math.PI / 2 */}
      <group rotation={[0, 0, (Math.PI * 1 * 0) / 2]}>
        <mesh
          geometry={nodes.floor_01.geometry}
          material={materials.sheet_floor}
          position={[-0.05, 3.31, 0]}
          rotation={[0, 0, -Math.PI]}
        />

        <group>
          <group position={[-0.03, 2.4, 0]}>
            {/* Rotation으로 힌지를 조절합니다.
            Close: 0 | Open: -1/2 PI */}
            <group rotation={[0, 0, (-Math.PI * 0) / 2]} ref={contentMainRef}>
              <mesh
                geometry={nodes.main_01.geometry}
                material={materials.content_main}
                customDepthMaterial={depthMaterials.content_main}
                scale={[1, 0.61, 1]}
                position={[0.02, 2.05, 0]}
                castShadow
                receiveShadow
              />
            </group>
          </group>

          <group position={[-0.04, 4.8, 0]}>
            {/* Rotation으로 힌지를 조절합니다. Close: -PI, Open: -1/2 * PI */}
            <group rotation={[0, 0, (-Math.PI * 2) / 2]} ref={contentFrontRef}>
              <mesh
                geometry={nodes.front_01.geometry}
                material={materials.content_front}
                customDepthMaterial={depthMaterials.content_front}
                scale={[1, 0.61, 1]}
                position={[-0.01, 2.05, 0]}
                castShadow
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default memo(Model);